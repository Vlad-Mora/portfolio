import React from "react";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const router = useRouter();

    function redirectToPage(page: string) {
        router.push(page)
    }

    return (
        <div className={`navbar noselect ${isOpen ? "open" : ""}`}>
            <div className="navbar-icon" onClick={() => setIsOpen(!isOpen)}>
                <img
                    className="icon"
                    src="assets/images/logo.png"
                />
                <div className="angle" />
            </div>
            <div className="navbar-content">
                <div 
                    className={`navbar-item ${router.route === "/"}`} 
                    onClick={() => redirectToPage("/")}
                >Home</div>
                <div
                    className={`navbar-item ${router.route === "/contact"}`}
                    onClick={() => redirectToPage("/contact")}
                >Contact</div>
                <div
                    className={`navbar-item ${router.route === "/projects"}`}
                    onClick={() => redirectToPage("projects")}
                >Projects</div>
            </div>
        </div>
    );
};
export default React.memo(NavBar);
