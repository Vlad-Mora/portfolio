import React from "react";

const LoadingCircle: React.FC = () => {

    return (
        <div className="loading-animation">
            <div className="loading-circle"/>
            <div className="loading-text">Loading...</div>
        </div>
    );
}

export default React.memo(LoadingCircle);