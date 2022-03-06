import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import queryString from "query-string";

import { IAccessTokenDataProps } from "@interfaces/Spotify";

import { setCookie } from "@helpers/cookieFunctions";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

const AuthPage = () => {
  const { setSpotifyLoggedIn } = React.useContext(ContextContainer) as ContextProps;
  const router = useRouter();

  React.useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error === null) {
      const code = new URLSearchParams(window.location.search).get("code");

      axios
        .post(
          `https://accounts.spotify.com/api/token`,
          queryString.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "https://vlad-mora-portofolio.herokuapp.com/spotify/auth/",
          }),
          {
            headers: {
              Authorization: `Basic ${process.env.REACT_APP_CLIENT_ID_SECRET_ENCODED}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response: IAccessTokenDataProps) => {
          setCookie(
            "refreshToken",
            { refreshToken: response.data.refresh_token },
            365
          );
          setCookie(
            "accessToken",
            { accessToken: response.data.access_token },
            response.data.expires_in / 60 / 60 / 24
          );

          setSpotifyLoggedIn(true);
          router.push("/spotify");
        })
        .catch((error) => {
          console.log("**ERROR:", error);
        });
    }
  }, []);

  return <></>;
};

export default AuthPage;
