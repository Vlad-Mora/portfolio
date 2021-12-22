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
