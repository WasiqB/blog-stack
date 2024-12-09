export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  medium_connected: boolean;
  hashnode_connected: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
}