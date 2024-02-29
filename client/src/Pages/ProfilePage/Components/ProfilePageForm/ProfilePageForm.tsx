import React, {FC, useEffect, useState} from 'react';
import classes from "./ProfilePageForm.module.scss";
import Input from "../../../../Elements/Input/Input";
import {FormStateType} from "../../types/FormStateType";
import InputImage from "../../../../Elements/InputImage/InputImage";
import {ErrorFormStateType} from "../../types/ErrorFormStateType";

interface AccountSettingsFormProps {
    formState: FormStateType,
    errorState: ErrorFormStateType,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const ProfilePageForm:FC<AccountSettingsFormProps> = ({formState, errorState, onChange}) => {
    const [imageSrc, setImageSrc] = useState<string>("");

    useEffect(() => {
        if(formState.photo instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(formState.photo);
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
        } else {
            setImageSrc(formState.photo ? `${process.env.REACT_APP_API_URL}/${formState.photo}`:"");
        }
    }, [formState.photo])

    return (
        <form className={classes.form}>

            <div className={classes.formColumn}>

                <Input
                    type={"text"}
                    label={"Ім’я"}
                    placeholder={""}
                    name={"name"}
                    value={formState.name}
                    onChange={onChange}
                    error={errorState.name}
                />

                <Input
                    type={"text"}
                    label={"Фамілія"}
                    placeholder={""}
                    name={"surname"}
                    value={formState.surname}
                    onChange={onChange}
                    error={errorState.surname}
                />

                <InputImage
                    label={"Фото профілю"}
                    name={"photo"}
                    value={imageSrc}
                    onChange={onChange}
                    error={errorState.photo}
                />

                <Input
                    type={"email"}
                    label={"Пошта"}
                    placeholder={""}
                    name={"email"}
                    value={formState.email}
                    onChange={onChange}
                    error={errorState.email}
                />

                <Input
                    type={"tel"}
                    label={"Номер телефону"}
                    placeholder={""}
                    name={"phone"}
                    value={formState.phone}
                    onChange={onChange}
                    error={errorState.phone}
                />

                <Input
                    type={"text"}
                    label={"Аккаунт Telegram"}
                    placeholder={""}
                    name={"telegram"}
                    value={formState.telegram}
                    onChange={onChange}
                    error={errorState.telegram}
                />

            </div>

        </form>
    );
};

export default ProfilePageForm;