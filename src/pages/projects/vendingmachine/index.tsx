import React from "react";

import VendingMachineDisplay from "@molecules/VendingMachineDisplay";
import KeyPad from "@molecules/KeyPad";

const ContactPage = () => {

    return (
        <div className="vending-machine-wrapper">
            <div className="vending-machine-name">vending machine</div>
            <VendingMachineDisplay/>
            <KeyPad/>
        </div>
    );
};

export default ContactPage;
