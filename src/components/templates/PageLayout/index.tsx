import React from "react";
import { useRouter } from "next/router";

import NavBar from "@molecules/NavBar";
import Footer from "@molecules/Footer";
import MobileNavBar from "@molecules/NavBar/MobileNavBar";

interface IPageLayouProperties {
    children: React.ReactElement;
}

const PageLayout: React.FC<IPageLayouProperties> = ({ children }) => {

    const router = useRouter();
    const currentPage = router.route;
    const isPageCV = currentPage.includes("cv") ?? false;
    
    return (
        <>
            {!isPageCV && 
                <>
                    <NavBar/>
                    <MobileNavBar/>
                </>
            }
            {children}
            <Footer/>
        </>
    );
}

export default React.memo(PageLayout);