import React from "react";
import { useRouter } from "next/router";
import Button from "@atoms/Button/Button";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

const AuthPage = () => {
  const { spotifyLoggedIn } = React.useContext(
    ContextContainer
  ) as ContextProps;
  const AuthURL =
    "https://accounts.spotify.com/authorize?client_id=11c2b3cf750c474c8df6ed118f497f8a&response_type=code&redirect_uri=https://vlad-mora-portofolio.herokuapp.com/auth/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
  const router = useRouter();
  // const [accessToken, setAccessToken] = React.useState();
  // const [refreshToken, setRefreshToken] = React.useState();
  // const [expiresIn, setExpiresIn] = React.useState();

  React.useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error === null) {
      const code = new URLSearchParams(window.location.search).get("code");
      console.log(code);
    }
    console.log(error);
  }, []);

  return (
    <>
      <div className="content">
        {spotifyLoggedIn ? (
          router.push("/spotify")
        ) : (
          <Button href={AuthURL} text="Login" />
        )}
      </div>
    </>
  );
};

export default AuthPage;
