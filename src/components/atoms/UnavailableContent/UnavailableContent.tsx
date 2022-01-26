import React from "react";

const UnavailableContent: React.FC = () => {

    return (
        <div className="unavailable-content">
            Unfortunately, this content is not/will not be available on mobile.
        </div>
    );
};
export default React.memo(UnavailableContent);
