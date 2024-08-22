import React, {FC, useEffect, useState} from 'react';
import saveIcon from "../../assets/images/save_icon.svg";
import Page from "../../Components/Page/Page";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import Title from "../../Elements/Title/Title";
import Content from "../../Components/Content/Content";
import UserProfileForm from "./Components/UserProfileForm/UserProfileForm";
import {FormStateType} from "./types/FormStateType";
import {ErrorFormStateType} from "./types/ErrorFormStateType";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {editUser} from "../../store/thunks/UserThunks";
import Backdrop from "../../Components/Backdrop/Backdrop";
import ModalConfirmAction from "../../Components/Modals/ModalConfirmAction/ModalConfirmAction";
import Loader from "../../Elements/Loader/Loader";

const UserProfile: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.UserReducer.user);
    const isLoading = useAppSelector(state => state.UserReducer.isLoading);
    const [formState, setFormState] = useState<FormStateType>({
        name: user?.name || "",
        surname: user?.surname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        photo: user?.photo?.cropped["300"] || "",
        telegram: user?.telegram || "",
    })
    const [errorState, setErrorState] = useState<ErrorFormStateType>({
        name: false,
        surname: false,
        email: false,
        phone: false,
        photo: false,
        telegram: false
    })
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [saveState, setSaveState] = useState<boolean>(false);

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

        setSaveState(true);
    }
    const onSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in formState) {
            if (formState.hasOwnProperty(key)) formData.append(key, formState[key]);
        }

        dispatch(editUser(formData));
        setActiveModal(false);
        setSaveState(false);
    }
    const showConfirmModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const isInvalidName = formState.name.length === 0;
        const isInvalidSurname = formState.surname.length === 0;
        const isInvalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);
        const isInvalidPhone = !/^(\+38)?(0\d{9})$/.test(formState.phone);
        const isInvalidPhoto = formState.photo instanceof File && formState.photo.size >= 5 * 1024 * 1024;
        const isInvalidTelegram = formState.telegram ? !/^(https?:\/\/)?(www\.)?(t\.me|telegram\.me)\/([a-z0-9_]+)$/i.test(formState.telegram) : false;

        if (isInvalidName || isInvalidSurname || isInvalidEmail || isInvalidPhone || isInvalidPhoto || isInvalidTelegram) {
            if (isInvalidName) setErrorState(prevState => ({...prevState, name: "Введіть ім'я"}));
            if (isInvalidSurname) setErrorState(prevState => ({...prevState, surname: "Введіть прізвище"}));
            if (isInvalidEmail) setErrorState(prevState => ({...prevState, email: "Введіть коректну пошту"}));
            if (isInvalidPhone) setErrorState(prevState => ({...prevState, phone: "Введіть номер телефону типу +380999999999"}));
            if (isInvalidPhoto) setErrorState(prevState => ({...prevState, photo: "Максимальний розмір файлу 5 МБ"}));
            if (isInvalidTelegram) setErrorState(prevState => ({...prevState, telegram: "Некоректне посилання на Telegram"}));

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

        setActiveModal(prevState => !prevState);
    }
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveModal(false);
    }

    return (
        <Page>

            <SidebarUser/>

            <ContentPage style={{position: "relative"}}>

                <HeaderPage>

                    <Title level={2}>
                        Профіль
                    </Title>

                    {saveState &&
                        <Button
                            text={"Зберегти"}
                            icon={saveIcon}
                            iconColor={"var(--Color-Green)"}
                            style={{marginLeft: "auto"}}
                            onClick={showConfirmModal}
                        />
                    }

                </HeaderPage>

                <Content>

                    <UserProfileForm
                        formState={formState}
                        errorState={errorState}
                        onChange={onChangeInput}
                    />

                </Content>

                {isLoading &&
                    <Loader/>
                }

            </ContentPage>

            <Backdrop isOpen={activeModal}>
                <ModalConfirmAction
                    text={"Ви впевнені що хочете змінити дані облікового запису?"}
                    onCancel={closeModal}
                    onConfirm={onSubmitForm}
                />
            </Backdrop>

        </Page>
    );
};

export default UserProfile;