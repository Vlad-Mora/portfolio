export interface IAccessTokenDataProps {
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  };
}

export interface IRefreshTokenRequestProps {
  data: {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
  };
}

export interface IProfileDataProps {
  display_name: string;
  external_urls: {
    [key: string]: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: IProfilePictureProps[];
  type: string;
  uri: string;
}

export interface IProfilePictureProps {
  height: number;
  width: number;
  url: string;
}
