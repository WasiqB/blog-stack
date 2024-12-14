import { createClient } from '@/lib/supabase/client';

const HASHNODE_API_URL = 'https://api.hashnode.com';

export async function connectHashnode(token: string) {
  const supabase = createClient();
  
  // Verify token by fetching user profile
  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      query: `
        query {
          me {
            username
            publication {
              _id
              domain
            }
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid Hashnode token');
  }

  const { data } = await response.json();

  // Store token in Supabase
  const { error } = await supabase
    .from('platform_tokens')
    .upsert({
      platform: 'hashnode',
      token,
      profile: {
        username: data.me.username,
        publication: data.me.publication,
      },
    });

  if (error) {
    throw error;
  }

  return data.me;
}

export async function publishToHashnode(title: string, content: string, tags: string[]) {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from('platform_tokens')
    .select('token, profile')
    .eq('platform', 'hashnode')
    .single();

  if (!profile?.token) {
    throw new Error('Hashnode account not connected');
  }

  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': profile.token,
    },
    body: JSON.stringify({
      query: `
        mutation($input: CreateStoryInput!) {
          createStory(input: $input) {
            _id
            slug
          }
        }
      `,
      variables: {
        input: {
          title,
          contentMarkdown: content,
          tags: tags.map(tag => ({ _id: tag })),
          publicationId: profile.profile.publication._id,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to publish to Hashnode');
  }

  return response.json();
}