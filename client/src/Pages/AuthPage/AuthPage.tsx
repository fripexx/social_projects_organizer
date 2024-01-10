import React from 'react';
import classes from "./AuthPage.module.scss";
import {useLocation} from "react-router-dom";
import Login from "./Components/Login/Login";
import Branding from "./Components/Branding/Branding";
import Registration from "./Components/Registration/Registration";
import Title from "../../Elements/Title/Title";
import Paragraph from "../../Elements/Paragraph/Paragraph";
import {useAppSelector} from "../../store/hooks/redux";


const AuthPage: React.FC = () => {

    const location = useLocation();
    const isAuth = useAppSelector(state => state.UserReducer.isAuth);

    return (
        <div className={classes.page}>

            <div className={classes.form}>

                {location.pathname == "/login" &&
                    <>
                        <Branding/>
                        <Login/>
                    </>
                }

                {location.pathname == "/registration" &&
                    <Registration/>
                }

            </div>

            <div className={classes.content}>

                <div className={classes.container}>

                    <Title level={1} className={classes.content_title}>
                        {isAuth ? "Авторизован" : "Не авторизован"}
                    </Title>

                    <Paragraph className={classes.content_text}>
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsum
                    </Paragraph>

                </div>

            </div>

        </div>
    );
};

export default AuthPage;