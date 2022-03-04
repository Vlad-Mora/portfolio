import React from "react";
import { useEasybase } from "easybase-react";
import { Header, Input, Modal, Icon, Button, Segment, Grid, Checkbox } from "semantic-ui-react";
import md5 from "md5";

import { TravelAgencyUserProps } from "@interfaces/index";
import { ContextContainer, ContextProps } from "@context/ContextContainer";
import { getLocalCookie, setCookie } from "@helpers/cookieFunctions";

interface KeepLoggedInCookie {
    email: string;
    password: string;
    checked: boolean;
}

const LoginModal: React.FC = () => {

    const [users, setUsers] = React.useState<TravelAgencyUserProps[]>();
    const { db, e } = useEasybase();
    const { setUser } = React.useContext(ContextContainer) as ContextProps;

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [keepLoggedIn, setKeepLoggedIn] = React.useState<boolean | undefined>(false);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [registerName, setRegisterName] = React.useState<string>("");
    const [registerSurname, setRegisterSurname] = React.useState<string>("");
    const [registerEmail, setRegisterEmail] = React.useState<string>("");
    const [registerPassword, setRegisterPassword] = React.useState<string>("");

    const handleLogInEvent = async() => {
        
        if (keepLoggedIn) {
            setCookie(
                "keepLoggedIn",
                {
                    email: email,
                    password: password,
                    checked: keepLoggedIn
                },
                7
            )
        }

        await db("USERS").return().all().then((res: any) => setUsers(res));
    }

    React.useEffect(() => {
        users && users.forEach((item: TravelAgencyUserProps) => {
            if (item.email === email && item.password === password) {
                setUser(item)
                setUsers(undefined)
            }
        })
    }, [users])

    React.useEffect(() => {
        const keepLoggedInCookie: KeepLoggedInCookie | undefined = getLocalCookie("keepLoggedIn");
        if (keepLoggedInCookie?.checked) {
            setEmail(keepLoggedInCookie.email)
            setPassword(keepLoggedInCookie.password)
            setKeepLoggedIn(keepLoggedInCookie.checked)
            handleLogInEvent()
        }
    }, [])

    const handleRegisterEvent = async () => {
        const errorChecks: string[] = [];
        // Name
        if (!/^[A-Za-z\s]*$/.test(registerName) || registerName.length === 0) {
            errorChecks.push("Your name should only contain letters.")
            return
        }
        // Surname
        if (!/^[A-Za-z\s]*$/.test(registerSurname) || registerSurname.length === 0) {
            errorChecks.push("Your surname should only contain letters.")
            return
        }
        // Email
        if (registerEmail.length < 1 || !registerEmail.includes("@")) {
            errorChecks.push("Please make sure the email is correct.")
            return
        }
        // Password
        if (!/\d/.test(registerPassword) || registerPassword.length < 8) {
            errorChecks.push("Password is invalid. Please make sure your password is at least 8 characters long and contains numbers.")
            return
        }
        
        if (errorChecks.length === 0) {
            const defaultBalance = await db("TA-SETTINGS").where(
                e.eq("config", "maxBalance")
            ).return().one();
            
            await db("USERS").insert({
                name: registerName,
                surname: registerSurname,
                email: registerEmail,
                password: registerPassword,
                isAdmin: false,
                balance: Object.values(defaultBalance)[1]
            }).one().then(() => {
                setEmail(registerEmail);
                setPassword(registerPassword);
            }).then(() => handleLogInEvent())

        } else {
            setErrors(errorChecks)
            console.log(errors)
        }
    }

    return (
        <Modal
            basic
            open
            size="fullscreen"
            className="user-main-modal"
        >
            <Modal.Content>
                <Segment placeholder>
                    <Grid columns={2}  textAlign="center">
                        <Grid.Row verticalAlign="middle">
                            <Grid.Column className="signin-column">
                                <Header icon className="segment-header">
                                    <Icon name="sign-in"/>
                                    Log in
                                </Header>
                                <Input
                                    label="Email"
                                    labelPosition="left"
                                    onChange={(_, data) => setEmail(data.value)}
                                />
                                <Input
                                    label="Password"
                                    labelPosition="left"
                                    onChange={(_, data) => setPassword(md5(data.value))}
                                    type="password"
                                />
                                <Checkbox
                                    label="Keep me logged in"
                                    className={`${keepLoggedIn ? "checked" : ""}`}
                                    checked={keepLoggedIn}
                                    onChange={(_, data) => {
                                        setKeepLoggedIn(data.checked)
                                    }}
                                />
                                <Button
                                    className="segment-button"
                                    onClick={handleLogInEvent}
                                >
                                    Log in
                                </Button>
                            </Grid.Column>

                            <Grid.Column className="register-column">
                                <Header icon className="segment-header">
                                    <Icon name="signup"/>
                                    Sign up
                                </Header>
                                <Input
                                    className="modal-input"
                                    label="Name"
                                    labelPosition="left"
                                    onChange={(_, data) => setRegisterName(data.value)}
                                />
                                <Input
                                    className="modal-input"
                                    label="Surname"
                                    labelPosition="left"
                                    onChange={(_, data) => setRegisterSurname(data.value)}
                                />
                                <Input
                                    className="modal-input"
                                    label="Email"
                                    labelPosition="left"
                                    onChange={(_, data) => setRegisterEmail(data.value)}
                                />
                                <Input
                                    className="modal-input"
                                    label="Password"
                                    labelPosition="left"
                                    onChange={(_, data) => setRegisterPassword(md5(data.value))}
                                    type="password"
                                />
                                <Button
                                    className="segment-button"
                                    onClick={handleRegisterEvent}
                                >
                                    Register
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Modal.Content>
        </Modal>
    );
};
export default React.memo(LoginModal);
