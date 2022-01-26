import React from "react";

import VendingMachineDisplay from "@molecules/VendingMachineDisplay/VendingMachineDisplay";
import KeyPad from "@molecules/KeyPad/KeyPad";
import UnavailableContent from "@atoms/UnavailableContent/UnavailableContent";

const ContactPage = () => {

    return (
        <div className="content">
            <div className="vending-machine-wrapper">
                <div className="vending-machine-name">vending machine</div>
                <VendingMachineDisplay/>
                <KeyPad/>
            </div>
            <UnavailableContent/>
        </div>
    );
};

export default ContactPage;
