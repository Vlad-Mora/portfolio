import React from "react";

import Button from "@atoms/Button/Button";
import { ContextContainer, ContextProps } from "@context/ContextContainer";
import SignOutModal from "@organisms/Modals/SignOutModal/SignOutModal";
import { useEasybase } from "easybase-react";
import MyWalletModal from "@organisms/Modals/MyWalletModal/MyWalletModal";
import AdminModal from "@organisms/Modals/AdminModal/AdminModal";

const UserTag: React.FC = () => {

    const { user, setUser } = React.useContext(ContextContainer) as ContextProps;
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const { db, useReturn, e } = useEasybase();
    const { frame } = useReturn(() => db("USERS").return().where(e.and(e.eq("name", user?.name!), e.eq("surname", user?.surname!))), [])

    React.useEffect(() => {
        const newUser: any = frame[0]
        if (newUser) {
            setUser(newUser)
        }
    }, [frame])

    return (
        <div className="usertag">
            <Button
                className={`user-name ${isActive ? "active" : ""}`}
                icon="user"
                text={<div>
                    <span>{user?.name} {user?.surname.toUpperCase()}</span>
                    Balance: £{user?.balance}
                </div>}
                onClick={() => setIsActive(!isActive)}
            />
            <div className="animation-bar">
                    <div className={`item ${isActive ? "active" : ""}`}/>
                    <div className={`item ${isActive ? "active" : ""}`}/>
                    <div className={`item ${isActive ? "active" : ""}`}/>
                    <div className={`item ${isActive ? "active" : ""}`}/>
                    <div className={`item ${isActive ? "active" : ""}`}/>
            </div>
            <div className={`usertag-dropdown ${isActive ? "active" : ""}`}>
                <AdminModal/>
                <MyWalletModal/>
                <SignOutModal/>
            </div>
        </div>
    )
}

export default React.memo(UserTag);