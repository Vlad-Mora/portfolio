import React from "react";
import Button from "@atoms/Button/Button";

const AuthPage = ({ children }: any) => {
  const AuthURL =
    "https://accounts.spotify.com/authorize?client_id=11c2b3cf750c474c8df6ed118f497f8a&response_type=code&redirect_uri=https://vlad-mora-portofolio.herokuapp.com/auth/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
  const [code, setCode] = React.useState<string>();
  // const [accessToken, setAccessToken] = React.useState();
  // const [refreshToken, setRefreshToken] = React.useState();
  // const [expiresIn, setExpiresIn] = React.useState();

  if (typeof window !== "undefined") {
    const code = window.location.search;
    code && setCode(code);
  }

  React.useEffect(() => {
    code !== undefined && console.log(code);
  }, [code]);

  return (
    <>
      <div className="content">
        {code ? { children } : <Button href={AuthURL} text="Login" />}
      </div>
    </>
  );
};

export default AuthPage;
