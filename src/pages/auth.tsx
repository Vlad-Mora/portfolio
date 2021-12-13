import React from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

const AuthPage = () => {
  const { setSpotifyLoggedIn } = React.useContext(
    ContextContainer
  ) as ContextProps;
  // const router = useRouter();
  // const clientID = "11c2b3cf750c474c8df6ed118f497f8a";
  // const clientSecret = "528d55e36d774afa8f52142b8078bfab";
  // const [accessToken, setAccessToken] = React.useState();
  // const [refreshToken, setRefreshToken] = React.useState();
  // const [expiresIn, setExpiresIn] = React.useState();

  React.useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error === null) {
      const code = new URLSearchParams(window.location.search).get("code");

      axios
        .post(`https://accounts.spotify.com/api/token`, {
          headers: {
            Authorization:
              "Basic MTFjMmIzY2Y3NTBjNDc0YzhkZjZlZDExOGY0OTdmOGE6NTI4ZDU1ZTM2ZDc3NGFmYThmNTIxNDJiODA3OGJmYWI",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "https://vlad-mora-portofolio.herokuapp.com/auth/",
          },
        })
        .then((response) => {
          console.log(response);
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
