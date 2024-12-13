export interface MediumProfile {
  id: string;
  username: string;
  name: string;
  token: string;
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
  token: string;
}

export interface PlatformConfig {
  medium?: MediumProfile;
  hashnode?: HashnodeProfile;
}