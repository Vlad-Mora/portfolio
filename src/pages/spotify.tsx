import React from "react";
// import axios from "axios";
import AuthPage from "@pages/auth";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

const IndexPage = () => {
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
        <AuthPage />
      )}
    </>
  );
};

export default IndexPage;
