import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";

interface IPageLayouProperties {
    children: React.ReactElement;
}

const PageLayout: React.FC<IPageLayouProperties> = ({ children }) => {
    
    const router = useRouter();

    return (
        <>
            <Button
                className="step-backward"
                content="Back"
                onClick={() => router.back()}
            >
                <Icon name="step backward"/>
            </Button>
            {children}
        </>
    );
}

export default React.memo(PageLayout);