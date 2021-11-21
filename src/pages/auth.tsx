import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

const AuthPage = () => {
  const { setSpotifyLoggedIn } = React.useContext(
    ContextContainer
  ) as ContextProps;
  const router = useRouter();
  // const [accessToken, setAccessToken] = React.useState();
  // const [refreshToken, setRefreshToken] = React.useState();
  // const [expiresIn, setExpiresIn] = React.useState();

  React.useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error === null) {
      const code = new URLSearchParams(window.location.search).get("code");

      setSpotifyLoggedIn(true);
      router.push("/spotify");

      axios
        .post("https://api.spotify.com/api/token", {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "https://vlad-mora-portofolio.herokuapp.com/spotify/",
        })
        .then((response) => {
          console.log(response);
        });
    }
  }, []);

  return <></>;
};

export default AuthPage;
