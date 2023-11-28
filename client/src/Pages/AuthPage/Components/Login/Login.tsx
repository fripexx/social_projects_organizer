import React, {FC} from 'react';
import classes from "./Login.module.scss";
import Input from "../../../../Elements/Input/Input";
import Submit from "../../../../Elements/Submit/Submit";
import {NavLink} from "react-router-dom";
import Title from "../../../../Elements/Title/Title";

const Login:FC = () => {
    return (
        <form className={classes.form}>

            <Title level={2} className={classes.title}>
                Авторизація
            </Title>

            <Input
                type={"email"}
                label={"Пошта"}
                placeholder={""}
                name={'email'}
            />

            <Input
                type={"password"}
                label={"Пароль"}
                placeholder={""}
                name={"password"}
            />

            <Submit>
                Вхід
            </Submit>

            <div className={classes.links}>

                <NavLink to={"/registration"} className={classes.link}>
                    Реєстрація
                </NavLink>

                <NavLink to={"/reset-password"} className={classes.link}>
                    Забули пароль
                </NavLink>

            </div>

        </form>
    );
};

export default Login;