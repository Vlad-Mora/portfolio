import React from "react";
import { useRouter } from "next/router";

interface INavItemProperties {
  title: string;
  link: string;
}

const NavItem: React.FC<INavItemProperties> = ({ title, link }) => {

    const [isActive, setIsActive] = React.useState<boolean>(false);
    
    const router = useRouter();
    const currentPage = router.route;

    React.useEffect(() => {
        if (link !== "/") {
            currentPage.includes(link)
            ? setIsActive(true)
            : setIsActive(false);
        } else {
            link === currentPage
            ? setIsActive(true)
            : setIsActive(false);
        }
    }, [])

    return (
        <a
            href={link}
            className={`navbar-item ${isActive ? "active" : ""}`}
        >
            {title}
        </a>
    );
};
export default React.memo(NavItem);
