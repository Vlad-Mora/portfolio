import React from "react";
import Link from "next/link";

interface INavItemProperties {
  title: string;
  link: string;
}

const NavItem: React.FC<INavItemProperties> = ({ title, link }) => {

    return (
        <div className="navbar-item">
            <Link
                href={link}
                scroll
                replace
            >
                {title}
            </Link>
        </div>
    );
};
export default React.memo(NavItem);
