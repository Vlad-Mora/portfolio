import React from "react";

interface IPageLayouProperties {
    children: React.ReactElement;
}

const PageLayout: React.FC<IPageLayouProperties> = ({ children }) => {
    
    return (
        <>
            {children}
        </>
    );
}

export default React.memo(PageLayout);