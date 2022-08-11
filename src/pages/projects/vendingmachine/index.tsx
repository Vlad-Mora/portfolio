import React, { CSSProperties } from "react";

import ItemContainer from "@atoms/ItemContainer";
import VendingMachineDisplay from "@atoms/VendingMachineDisplay";

import { ContextContainer, ContextProps, IProject } from "@context/index";
import { ContextProvider } from "@context/VendingMachine";

interface ItemProps {
    image: string;
    price: number;
}

const VendingMachine: React.FC = () => {

    const { projects } = React.useContext(ContextContainer) as ContextProps;
    const [currentPage, setCurrentPage] = React.useState<IProject | null>(null);

    // System made to modify prices but for the purpose of testing
    // it is set to 1
    const items: ItemProps[] = [
        {
            image: "https://i.imgur.com/WgFPXvQ.png",
            price: 1
        },
        {
            image: "https://i.imgur.com/WgFPXvQ.png",
            price: 1
        },
        {
            image: "https://i.imgur.com/Dx9aVaE.png",
            price: 1
        },
        {
            image: "https://i.imgur.com/Dx9aVaE.png",
            price: 1
        },
        {
            image: "https://i.imgur.com/nyEmQon.png",
            price: 1
        },
        {
            image: "https://i.imgur.com/nyEmQon.png",
            price: 1
        },
    ];

    React.useEffect(() => {
        projects.forEach((project) => {
            if (project.name == "Vending Machine") {
                setCurrentPage(project)
            }
        })
    }, [projects]);

    return (
        <ContextProvider>
            <div 
                className="vendingmachine-page"
                style={{ 
                    "--primaryColour": currentPage?.colors.primaryColour,
                    "--secondaryColour": currentPage?.colors.secondaryColour,
                    "--accentColour": currentPage?.colors.accentColour 
                } as CSSProperties}
            >
                <div className="machine">
                    <div className="side-panel">
                        {/* Had to turn this into a separate component due to inability of
                        using 2 different contexts in one component */}
                        <VendingMachineDisplay/>
                        <div className="drink-options">
                            £1 = 1 drink
                            {items.map((item) => (
                                <ItemContainer
                                    image={item.image}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    </div>
                </div>    
            </div>
        </ContextProvider>
    );
};

export default React.memo(VendingMachine);