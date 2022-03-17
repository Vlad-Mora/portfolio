import React from "react";
import Carousel from "react-multi-carousel";
import { useEasybase } from 'easybase-react';

import ShopItem from "@atoms/ShopItem";

import UserTag from "@molecules/UserTag";

import LoginModal from "@organisms/Modals/LoginModal";
import CheckoutModal from "@organisms/Modals/CheckoutModal";
import DisplayItemModal from "@organisms/Modals/DisplayItemModal";

import { TripItemProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const TravelAgencyPage = () => {

    const { user } = React.useContext(ContextContainer) as ContextProps;
    const { db, useReturn } = useEasybase();
    
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1440 },
            items: 3
        },
        laptop: {
            breakpoint: { max: 1439, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1023, min: 960 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 959, min: 0 },
            items: 1
        }
      };

    const { frame }: Record<string, any> = useReturn(() => db("TA-LOCATIONS").return(), []);

    return (
        <>
            {user ?
                <div className="travelagency">
                    <div className="travelagency-navbar">
                        <div className="scrollable-preview">
                            <Carousel
                                swipeable
                                autoPlay
                                pauseOnHover
                                showDots
                                responsive={responsive}
                                infinite
                                minimumTouchDrag={50}
                                partialVisible
                                autoPlaySpeed={3000}
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                itemClass="carousel-item-padding-40-px"
                            >
                                {frame.map((item: TripItemProps) => (
                                    <ShopItem
                                        photo={item.photo}
                                        title={item.landmark}
                                        rating={item.rating}
                                        key={item.landmark}
                                    />
                                ))}
                            </Carousel>
                        </div>
                        <UserTag/>
                        <CheckoutModal/>
                    </div>
                    <div className="travelagency-content">
                        {frame.map((item: TripItemProps) => (
                            <>
                                {!item.hidden && <DisplayItemModal item={item}/>}
                            </>
                        ))}
                    </div>
                </div>
            : <LoginModal/>
            }    
        </>
    );
};

export default TravelAgencyPage;