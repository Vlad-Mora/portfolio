import React from "react";
import Button from "@atoms/Button/Button";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

const IndexPage = () => {
  const AuthURL =
    "https://accounts.spotify.com/authorize?client_id=11c2b3cf750c474c8df6ed118f497f8a&response_type=code&redirect_uri=https://vlad-mora-portofolio.herokuapp.com/auth/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
  const { spotifyLoggedIn } = React.useContext(
    ContextContainer
  ) as ContextProps;
  // WORKING
  // axios.get("https://api.spotify.com/v1/me", {
  //   headers: {
  //     Authorization: "Bearer AQCc5xah2zu-29a4Pwx9oFTDvtjXvS0NViCUG6Nu28GfxUCDmrZycIhZDtKcxDyXUvRW4fF5Y-YwGnV2Zbz_7gAGM9VNUGBoBVpbi7hO6cGern-hB68DfCKJoIQu-Dh4dlasiblcfUKOVwESEl8RgET7Zz5y18okHrdd"
  //   },
  // })
  // .then(response => {
  //     console.log(response.data);
  // });

  return (
    <>
      {spotifyLoggedIn ? (
        <div className="content">
          <div>Done</div>
        </div>
      ) : (
        <Button href={AuthURL} text="Login" />
      )}
    </>
  );
};

export default IndexPage;
