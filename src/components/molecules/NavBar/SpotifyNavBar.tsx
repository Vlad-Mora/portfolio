import React, { CSSProperties } from "react";

import { IProfilePictureProps } from "@interfaces/requests";

interface ISpotifyNavBarProps {
    name: string | undefined;
    images: IProfilePictureProps[] | undefined;
}

const SpotifyNavBar: React.FC<ISpotifyNavBarProps> = ({ name, images }) => {

    const [menuActive, setMenuActive] = React.useState<boolean>(true);

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
                    <div className="name">{name}</div>
                </div>
            </div>
        </div>
    );
};
export default React.memo(SpotifyNavBar);
