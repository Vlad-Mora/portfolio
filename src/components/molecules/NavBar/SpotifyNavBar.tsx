import React, { CSSProperties } from "react";

import { IProfilePictureProps } from "@interfaces/requests";

interface ISpotifyNavBarProps {
    name: string | undefined;
    images: IProfilePictureProps[] | undefined;
    profileLink: string | undefined;
}

const SpotifyNavBar: React.FC<ISpotifyNavBarProps> = ({ name, images, profileLink }) => {

    const [menuActive, setMenuActive] = React.useState<boolean>(false);

    return (
        <div className="spotify-navbar">
            <div className="userTag-wrapper moving-glow" onClick={() => setMenuActive(!menuActive)}>
                <div className="image">
                    {images && images[0] 
                    ? <img src={`${images[0].url}`} style={{ "--pfpHeight": `${images[0].height}px`, "--pfpWidth": `${images[0].width}px`} as CSSProperties}/> 
                    : <i className="far fa-user"/>
                    }
                </div>
                <div className={`menu-wrapper ${menuActive}`}>
                    <a className="name noselect" href={profileLink}>{name}</a>
                </div>
            </div>
        </div>
    );
};
export default React.memo(SpotifyNavBar);
