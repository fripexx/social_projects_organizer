import React, {FC, useEffect, useState} from 'react';
import saveIcon from "../../assets/images/save_icon.svg";
import Page from "../../Components/Page/Page";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import Title from "../../Elements/Title/Title";
import Content from "../../Components/Content/Content";
import AccountSettingsForm from "./Components/AccountSettingsForm/AccountSettingsForm";
import {FormStateType} from "./types/FormStateType";
import {ErrorFormStateType} from "./types/ErrorFormStateType";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {editUser} from "../../store/thunks/UserThunks";

const AccountSettingsPage: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.UserReducer.user);
    const [formState, setFormState] = useState<FormStateType>({
        name: user?.name ? user.name : "",
        surname: user?.surname ? user.surname : "",
        email: user?.email ? user.email : "",
        phone: user?.phone ? user.phone : "",
        photo: user?.photo?.cropped ? user.photo.cropped["300"] : "",
        telegram: ""
    })
    const [errorState, setErrorState] = useState<ErrorFormStateType>({
        name: false,
        surname: false,
        email: false,
        phone: false,
        photo: false,
        telegram: false
    })

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();

        const value: string = e.currentTarget.value;
        const name: string = e.currentTarget.name;
        const type: string = e.currentTarget.type;

        if (type === "file") {
            const file = e.currentTarget.files && e.currentTarget.files[0];
            if (file) setFormState(prevState => ({...prevState, [name]: file}));
        } else {
            setFormState(prevState => ({...prevState, [name]: value}))
        }

        if (value) setErrorState(prevState => ({...prevState, [name]: false}))
    }
    const onSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const isInvalidName = formState.name.length === 0;
        const isInvalidSurname = formState.surname.length === 0;
        const isInvalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
        const isInvalidPhone = !/^(\+38)?(0\d{9})$/.test(formState.phone);
        const isInvalidPhoto = formState.photo instanceof File && formState.photo.size >= 5 * 1024 * 1024;

        if (isInvalidName || isInvalidSurname || isInvalidEmail || isInvalidPhone || isInvalidPhoto) {
            if (isInvalidName) setErrorState(prevState => ({...prevState, name: "Введіть ім'я"}));
            if (isInvalidSurname) setErrorState(prevState => ({...prevState, surname: "Введіть прізвище"}));
            if (isInvalidEmail) setErrorState(prevState => ({...prevState, email: "Введіть коректну пошту"}));
            if (isInvalidPhone) setErrorState(prevState => ({...prevState, phone: "Введіть номер телефону типу +380999999999"}));
            if (isInvalidPhoto) setErrorState(prevState => ({...prevState, photo: "Максимальний розмір файлу 5 МБ"}));

            return false;
        }

        setErrorState({
            name: false,
            surname: false,
            email: false,
            phone: false,
            photo: false,
            telegram: false
        });

        const formData = new FormData();

        for (const key in formState) {
            if (formState.hasOwnProperty(key)) formData.append(key, formState[key]);
        }

        dispatch(editUser(formData))
    }

    return (
        <Page>

            <SidebarUser/>

            <ContentPage>

                <HeaderPage>

                    <Title level={2}>
                        Профіль
                    </Title>

                    <Button
                        text={"Зберегти"}
                        icon={saveIcon}
                        iconColor={"var(--Color-Green)"}
                        style={{marginLeft: "auto"}}
                        onClick={onSubmitForm}
                    />

                </HeaderPage>

                <Content>

                    <AccountSettingsForm
                        formState={formState}
                        errorState={errorState}
                        onChange={onChangeInput}
                    />

                </Content>

            </ContentPage>
        </Page>
    );
};

export default AccountSettingsPage;