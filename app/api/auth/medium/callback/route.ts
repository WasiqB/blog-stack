import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const state = requestUrl.searchParams.get('state');
  
  if (!code || !state) {
    return NextResponse.redirect(
      `${requestUrl.origin}/dashboard/settings?error=missing_params`
    );
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Exchange code for access token
    const response = await fetch('https://api.medium.com/v1/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_MEDIUM_CLIENT_ID!,
        client_secret: process.env.MEDIUM_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: `${requestUrl.origin}/api/auth/medium/callback`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const { access_token } = await response.json();

    // Get user profile
    const profileResponse = await fetch('https://api.medium.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch Medium profile');
    }

    const { data: profile } = await profileResponse.json();

    // Store token in Supabase
    const { error } = await supabase
      .from('platform_tokens')
      .upsert({
        platform: 'medium',
        token: access_token,
        profile: {
          id: profile.id,
          username: profile.username,
          name: profile.name,
        },
      });

    if (error) throw error;

    return NextResponse.redirect(
      `${requestUrl.origin}/dashboard/settings?success=medium_connected`
    );
  } catch (error) {
    console.error('Medium OAuth error:', error);
    return NextResponse.redirect(
      `${requestUrl.origin}/dashboard/settings?error=auth_failed`
    );
  }
}