export interface PlatformToken {
  token: string;
  profile: any;
}

export interface PublishOptions {
  title: string;
  content: string;
  tags: string[];
}

export interface MediumProfile {
  id: string;
  username: string;
  name: string;
  publications: {
    id: string;
    name: string;
  }[];
}

export interface HashnodeProfile {
  id: string;
  username: string;
  publication: {
    id: string;
    domain: string;
  };
}

export interface PlatformConfig {
  medium?: {
    token: string;
    profile: MediumProfile;
  };
  hashnode?: {
    token: string;
    profile: HashnodeProfile;
  };
}

export type PlatformType = "medium" | "hashnode";
