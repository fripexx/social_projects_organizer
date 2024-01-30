import React, {FC, useEffect, useState} from 'react';
import classes from "./Login.module.scss";
import {NavLink, useNavigate} from "react-router-dom";
import Input from "../../../../Elements/Input/Input";
import Submit from "../../../../Elements/Submit/Submit";
import Title from "../../../../Elements/Title/Title";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/redux";
import {login, sendActivateLink} from "../../../../store/thunks/UserThunks";
import {AuthRequestType} from "../../../../store/types/AuthRequestType";
import Error from "../../../../Elements/Error/Error";
interface ErrorState {
    email: string | boolean,
    password: string | boolean,
}

const Login:FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const errorNotification = useAppSelector(state => state.UserReducer.error)
    const shouldRedirectToProjectsPage = useAppSelector(state => state.UserReducer.shouldRedirectToProjectsPage)

    const [errorState, setErrorState] = useState<ErrorState>({email: false, password: false})
    const [formState, setFormState] = useState<AuthRequestType>({email: "", password: ""})

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>):void => {
        e.preventDefault();

        const value: string = e.currentTarget.value;
        const name: string = e.currentTarget.name;


        setFormState(prevState => ({...prevState, [name]: value }))
        if(value) setErrorState(prevState => ({...prevState, [name]: false }))
    }
    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>):boolean => {
        e.preventDefault();

        const isInvalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
        const isInvalidPassword = formState.password.length < 8;

        if (isInvalidEmail || isInvalidPassword) {
            if (isInvalidEmail) setErrorState(prevState => ({ ...prevState, email: "Введіть коректну пошту" }));
            if (isInvalidPassword) setErrorState(prevState => ({ ...prevState, password: "Пароль не може бути меньше 8 символів" }));

            return false;
        }

        setErrorState({ email: false, password: false });
        dispatch(login(formState));

        return false;
    };
    const sendActivateLinkCallback = (e: React.FormEvent<HTMLElement>):void => {
        e.preventDefault();
        dispatch(sendActivateLink(formState.email));
    };

    useEffect(() => {
        if (shouldRedirectToProjectsPage) {
            navigate('/projects');
        }
    }, [shouldRedirectToProjectsPage, navigate]);

    return (
        <form className={classes.form} onSubmit={onSubmitForm}>

            <Title level={2} className={classes.title}>
                Авторизація
            </Title>

            <Input
                type={"email"}
                label={"Пошта"}
                placeholder={""}
                name={"email"}
                value={formState.email}
                onChange={onChangeInput}
                error={errorState.email}
            />

            <Input
                type={"password"}
                label={"Пароль"}
                placeholder={""}
                name={"password"}
                value={formState.password}
                onChange={onChangeInput}
                error={errorState.password}
            />

            <Submit>
                Вхід
            </Submit>

            {errorNotification &&
                <Error>{errorNotification.message}</Error>
            }

            {errorNotification?.status === 403 &&
                <span onClick={sendActivateLinkCallback} className={classes.send_activate_link}>
                    Повторно відправити повідомлення на пошту
                </span>
            }

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