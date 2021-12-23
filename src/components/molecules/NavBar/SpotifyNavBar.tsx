import React, { CSSProperties } from "react";

import { IProfilePictureProps } from "@interfaces/requests";

interface ISpotifyNavBarProps {
    name: string | undefined;
    images: IProfilePictureProps[] | undefined;
}

const SpotifyNavBar: React.FC<ISpotifyNavBarProps> = ({ name, images }) => {

    return (
        <div className="spotify-navbar">
            <div className="userTag-wrapper moving-glow">
                {images && images[0] ?
                    <div className="userTag-image" style={{ "--pfpHeight": `${images[0].height}px`, "--pfpWidth": `${images[0].width}px`} as CSSProperties}>
                       <img src={`${images[0].url}`}/>
                   </div> 
                :
                    <i className="far fa-user"/>
                }
                <div className="userTag-name noselect">{name}</div>
            </div>
        </div>
    );
};
export default React.memo(SpotifyNavBar);
