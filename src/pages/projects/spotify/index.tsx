import React from "react";
import axios from "axios";
import queryString from "query-string";

import Button from "@atoms/Button/Button";
import { ContextContainer, ContextProps } from "@context/ContextContainer";
import { getLocalCookie, setCookie } from "@helpers/cookieFunctions";
import {
  IProfileDataProps,
  IRefreshTokenRequestProps,
} from "@interfaces/requests";
import { handleRequest } from "@helpers/authFunctions";
import SpotifyNavBar from "@molecules/NavBar/SpotifyNavBar";

const IndexPage = () => {
  const AuthURL =
    `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=https://vlad-mora-portofolio.herokuapp.com/spotify/auth/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
  const { spotifyLoggedIn, setSpotifyLoggedIn } = React.useContext(
    ContextContainer
  ) as ContextProps;
  const [profileData, setProfileData] = React.useState<IProfileDataProps>();

  React.useEffect(() => {        
    if (getLocalCookie("refreshToken") !== undefined) {
        // @ts-ignore
        var refreshToken = Object.values(getLocalCookie("refreshToken"))[0];
    } else {
        setSpotifyLoggedIn(false);
    }
    
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
                Authorization: `Basic ${process.env.REACT_APP_CLIENT_ID_SECRET_ENCODED}`,
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

    if (spotifyLoggedIn && (profileData === undefined || profileData === null)) {
      // @ts-ignore
      const accessToken = Object.values(getLocalCookie("accessToken"))[0];
      handleRequest({
        url: "/v1/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response: any) => {
          setProfileData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <>
      <div className="content">
        {spotifyLoggedIn ? (
          <>
            <div className="spotify">
              <SpotifyNavBar
                name={profileData?.display_name}
                images={profileData?.images}
                profileLink={profileData?.external_urls["spotify"]}
              />
              Test
            </div>
          </>
        ) : (
          <Button href={AuthURL} text="Login" />
        )}
      </div>
    </>
  );
};

export default IndexPage;
