import React from "react";
import axios from "axios";
import queryString from "query-string";

import Button from "@atoms/Button/Button";
import { ContextContainer, ContextProps } from "@context/ContextContainer";
import { getLocalCookie, setCookie } from "@helpers/cookieFunctions";
import { IRefreshTokenRequestProps } from "@interfaces/requests";

const IndexPage = () => {
  const AuthURL =
    "https://accounts.spotify.com/authorize?client_id=11c2b3cf750c474c8df6ed118f497f8a&response_type=code&redirect_uri=https://vlad-mora-portofolio.herokuapp.com/auth/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
  const { spotifyLoggedIn, setSpotifyLoggedIn } = React.useContext(
    ContextContainer
  ) as ContextProps;
  const encodedClientIDSecret =
    "MTFjMmIzY2Y3NTBjNDc0YzhkZjZlZDExOGY0OTdmOGE6NTI4ZDU1ZTM2ZDc3NGFmYThmNTIxNDJiODA3OGJmYWI";

  React.useEffect(() => {
    // @ts-ignore
    const refreshToken = getLocalCookie("refreshToken")["refreshToken"];
    if (getLocalCookie("accessToken") !== undefined) {
      setSpotifyLoggedIn(true);
    } else {
      if (refreshToken !== undefined) {
        axios
          .post(
            `https://accounts.spotify.com/api/token`,
            queryString.stringify({
              grant_type: "refresh_token",
              refresh_token: refreshToken,
            }),
            {
              headers: {
                Authorization: `Basic ${encodedClientIDSecret}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((response: IRefreshTokenRequestProps) => {
            setCookie(
              "accessToken",
              { accessToken: response.data.access_token },
              response.data.expires_in / 60 / 60 / 24
            );
            setSpotifyLoggedIn(true);
          })
          .catch((error) => {
            console.log("**ERROR:", error);
          });
      } else {
        setSpotifyLoggedIn(false);
      }
    }
  });

  return (
    <>
      <div className="content">
        {spotifyLoggedIn ? (
          <div>Logged in</div>
        ) : (
          <Button href={AuthURL} text="Login" />
        )}
      </div>
    </>
  );
};

export default IndexPage;
