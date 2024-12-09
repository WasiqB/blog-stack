export interface Blog {
  id: string;
  title: string;
  tagline?: string;
  content: string;
  image_url?: string;
  status: 'draft' | 'published';
  tags: string[];
  view_count: number;
  comment_count: number;
  author_id: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  platforms: {
    medium?: boolean;
    hashnode?: boolean;
  };
}

export interface BlogFilter {
  status?: 'draft' | 'published';
  tags?: string[];
  sortBy?: 'newest' | 'oldest' | 'popular';
}