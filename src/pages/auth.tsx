import React from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import queryString from "query-string";

import { setCookie } from "@helpers/cookieFunctions";
import { ContextContainer, ContextProps } from "@context/ContextContainer";
import { IAccessTokenRequestProps } from "@interfaces/requests";

const AuthPage = () => {
  const { setSpotifyLoggedIn } = React.useContext(
    ContextContainer
  ) as ContextProps;
  // const router = useRouter();
  const encodedClientIDSecret =
    "MTFjMmIzY2Y3NTBjNDc0YzhkZjZlZDExOGY0OTdmOGE6NTI4ZDU1ZTM2ZDc3NGFmYThmNTIxNDJiODA3OGJmYWI";

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
            redirect_uri: "https://vlad-mora-portofolio.herokuapp.com/auth/",
          }),
          {
            headers: {
              Authorization: `Basic ${encodedClientIDSecret}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response: IAccessTokenRequestProps) => {
          console.log(response);
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
          // router.push("/spotify");
        })
        .catch((error) => {
          console.log("**ERROR:", error);
        });

      setSpotifyLoggedIn(true);
      // router.push("/spotify");
    }
  }, []);

  return <></>;
};

export default AuthPage;
