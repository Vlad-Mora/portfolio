import React from "react";
import NavBar from "@molecules/NavBar/NavBar";
import Footer from "@molecules/Footer/Footer";
import MobileNavBar from "@molecules/NavBar/MobileNavBar";

interface IPageLayouProperties {
    children: React.ReactElement;
}

const PageLayout: React.FC<IPageLayouProperties> = ({ children }) => {

    return (
        <>
            <NavBar/>
            <MobileNavBar/>
            {children}
            <Footer/>
        </>
    );
}

export default React.memo(PageLayout);