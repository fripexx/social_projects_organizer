import React, {FC, useEffect, useState} from 'react';
import classes from "./Registration.module.scss";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/redux";
import Radio from "../../../../Elements/Radio/Radio";
import Input from "../../../../Elements/Input/Input";
import Submit from "../../../../Elements/Submit/Submit";
import Title from "../../../../Elements/Title/Title";
import {RegistrationRequestType} from "../../../../store/types/RegistrationRequestType";
import {registration} from "../../../../store/thunks/UserThunks";
import Error from "../../../../Elements/Error/Error";

interface ErrorState {
    name: string | boolean,
    surname: string | boolean,
    email: string | boolean,
    phone: string | boolean,
    password: string | boolean,
    repeatPassword: string | boolean,
}
interface RegistrationState extends RegistrationRequestType{
    repeatPassword: string,
}

const Registration: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.UserReducer.user);
    const errorNotification = useAppSelector(state => state.UserReducer.error);
    const shouldRedirectToLoginPage = useAppSelector(state => state.UserReducer.shouldRedirectToLoginPage)

    const [errorState, setErrorState] = useState<ErrorState>({
        name: false,
        surname: false,
        email: false,
        phone: false,
        password: false,
        repeatPassword: false,
    })
    const [formState, setFormState] = useState<RegistrationState>({
        typeUser: 'smm_manager',
        name: "Петро",
        surname: "Порошенко",
        email: "fripexxdev@gmail.com",
        phone: "+380996309164",
        password: "genelec2012",
        repeatPassword: "genelec2012"
    })

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>):void => {
        e.preventDefault();

        const value: string = e.currentTarget.value;
        const name: string = e.currentTarget.name;

        setFormState(prevState => ({...prevState, [name]: value }))
        if(value) setErrorState(prevState => ({...prevState, [name]: false }))
    }
    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isInvalidName = formState.name.length === 0;
        const isInvalidSurname = formState.surname.length === 0;
        const isInvalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
        const isInvalidPhone = !/^(\+38)?(0\d{9})$/.test(formState.phone);
        const isInvalidPassword = formState.password.length < 8;
        const isInvalidRepeatPassword = formState.password !== formState.repeatPassword;

        if (isInvalidName || isInvalidSurname || isInvalidEmail || isInvalidPhone || isInvalidPassword || isInvalidRepeatPassword) {
            if (isInvalidName) setErrorState(prevState => ({ ...prevState, name: "Введіть ім'я" }));
            if (isInvalidSurname) setErrorState(prevState => ({ ...prevState, surname: "Введіть прізвище" }));
            if (isInvalidEmail) setErrorState(prevState => ({ ...prevState, email: "Введіть коректну пошту" }));
            if (isInvalidPhone) setErrorState(prevState => ({ ...prevState, phone: "Введіть номер телефону типу +380999999999" }));
            if (isInvalidPassword) setErrorState(prevState => ({ ...prevState, password: "Пароль не може бути меньше 8 символів" }));
            if (isInvalidRepeatPassword) setErrorState(prevState => ({ ...prevState, repeatPassword: "Не співпадають паролі" }));

            return false;
        }

        setErrorState({
            name: false,
            surname: false,
            email: false,
            phone: false,
            password: false,
            repeatPassword: false,
        });

        const { repeatPassword, ...copiedObject } = formState;

        dispatch(registration(copiedObject));

    };

    useEffect(() => {
        if (shouldRedirectToLoginPage) {
            setTimeout(() => {
                navigate('/login');
            }, 10000)
        }
    }, [shouldRedirectToLoginPage, navigate]);

    return (
        <form className={classes.form} onSubmit={onSubmitForm}>

            <Title level={2} className={classes.title}>
                Реєстрація
            </Title>

            {!shouldRedirectToLoginPage &&
                <>
                    <div className={classes.radios}>

                        <Title level={3} className={classes.radios_title}>
                            Тип аккаунту
                        </Title>

                        <Radio
                            label={"SMM-менеджер"}
                            name={"typeUser"}
                            value={"smm_manager"}
                            checked={formState.typeUser === "smm_manager"}
                            onChange={onChangeInput}
                        />

                        <Radio
                            label={"Замовник"}
                            name={"typeUser"}
                            value={"customer"}
                            checked={formState.typeUser === "customer"}
                            onChange={onChangeInput}
                        />

                        <Radio
                            label={"Таргетолог"}
                            name={"typeUser"}
                            value={"targetologist"}
                            checked={formState.typeUser === "targetologist"}
                            onChange={onChangeInput}
                        />

                        <Radio
                            label={"Дизайнер"}
                            name={"typeUser"}
                            value={"designer"}
                            checked={formState.typeUser === "designer"}
                            onChange={onChangeInput}
                        />

                    </div>

                    <Input
                        type={"name"}
                        label={"Ім’я"}
                        placeholder={""}
                        name={"name"}
                        value={formState.name}
                        onChange={onChangeInput}
                        error={errorState.name}
                    />

                    <Input
                        type={"surname"}
                        label={"Прізвище"}
                        placeholder={""}
                        name={"surname"}
                        value={formState.surname}
                        onChange={onChangeInput}
                        error={errorState.surname}
                    />

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
                        type={"tel"}
                        label={"Номер телефону"}
                        placeholder={""}
                        name={"phone"}
                        value={formState.phone}
                        onChange={onChangeInput}
                        error={errorState.phone}
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

                    <Input
                        type={"password"}
                        label={"Повторити пароль"}
                        placeholder={""}
                        name={"repeatPassword"}
                        value={formState.repeatPassword}
                        onChange={onChangeInput}
                        error={errorState.repeatPassword}
                    />

                    {errorNotification &&
                        <Error>{errorNotification.message}</Error>
                    }

                    <Submit>
                        Реєстрація
                    </Submit>
                </>
            }

            {shouldRedirectToLoginPage &&
                <p>
                    Ви успішно зареєструвались! Щоб розпочати, перейдіть на сторінку авторизації та увійдіть в свій обліковий запис.
                </p>
            }

            <div className={classes.links}>

                <NavLink to={"/login"} className={classes.link}>
                    Авторизація
                </NavLink>

            </div>

        </form>
    );
};

export default Registration;