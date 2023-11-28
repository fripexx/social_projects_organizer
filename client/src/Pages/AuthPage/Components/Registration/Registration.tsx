import React, {FC} from 'react';
import classes from "./Registration.module.scss";
import {NavLink} from "react-router-dom";
import Radio from "../../../../Elements/Radio/Radio";
import Input from "../../../../Elements/Input/Input";
import Submit from "../../../../Elements/Submit/Submit";
import Title from "../../../../Elements/Title/Title";

const Registration: FC = () => {
    return (
        <form className={classes.form}>

            <Title level={2} className={classes.title}>
                Реєстрація
            </Title>

            <div className={classes.radios}>

                <Title level={3} className={classes.radios_title}>
                    Тип аккаунту
                </Title>

                <Radio
                    label={"SMM-менеджер"}
                    placeholder={""}
                    name={'type_user'}
                    value={'smm_manager'}
                    defaultChecked={true}
                />

                <Radio
                    label={"Замовник"}
                    placeholder={""}
                    name={'type_user'}
                    value={'customer'}
                />

                <Radio
                    label={"Таргетолог"}
                    placeholder={""}
                    name={'type_user'}
                    value={'targetologist'}
                />

                <Radio
                    label={"Дизайнер"}
                    placeholder={""}
                    name={'type_user'}
                    value={'designer'}
                />

            </div>


            <Input
                type={"name"}
                label={"Ім’я"}
                placeholder={""}
                name={'name'}
            />

            <Input
                type={"surname"}
                label={"Прізвище"}
                placeholder={""}
                name={'surname'}
            />

            <Input
                type={"email"}
                label={"Пошта"}
                placeholder={""}
                name={'email'}
            />

            <Input
                type={"tel"}
                label={"Номер телефону"}
                placeholder={""}
                name={'tel'}
            />

            <Input
                type={"password"}
                label={"Пароль"}
                placeholder={""}
                name={"password"}
            />

            <Input
                type={"password"}
                label={"Повторити пароль"}
                placeholder={""}
                name={"repeat_password"}
            />

            <Submit>
                Реєстрація
            </Submit>

            <div className={classes.links}>

                <NavLink to={"/login"} className={classes.link}>
                    Авторизація
                </NavLink>

            </div>

        </form>
    );
};

export default Registration;