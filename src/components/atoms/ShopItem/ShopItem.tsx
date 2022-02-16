import React from "react";

interface ShopItemProps {
    title: string;
    photo: string;
    rating: number;
}

const ShopItem: React.FC<ShopItemProps> = ({ title, photo, rating }) => {

    return (
        <div className="shop-item noselect" style={{ backgroundImage: `url(${photo})`}}>
            <div className="item-title">{title}</div>
            <div className="item-rating">{rating}/10</div>
        </div>
    )
}

export default React.memo(ShopItem)