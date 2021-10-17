import React from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";

interface INavItemProperties {
  title: string;
  link: string;
}

const NavItem: React.FC<INavItemProperties> = ({ title, link }) => {
    
    const router = useRouter();

    return (
        <div className="navbar-item">
            <Button
                onClick={() => {
                    router.push(link);
                }}
            >
                {title}
            </Button>
        </div>
    );
};
export default React.memo(NavItem);
