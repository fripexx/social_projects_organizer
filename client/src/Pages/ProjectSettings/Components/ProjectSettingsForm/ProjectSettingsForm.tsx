import React, {FC, useEffect, useState} from 'react';
import classes from "./ProjectSettingsForm.module.scss";
import Input from "../../../../Elements/Input/Input";
import InputColor from "../../../../Elements/InputColor/InputColor";
import {FormStateType} from "../../types/FormStateType";
import {ErrorFormStateType} from "../../types/ErrorFormStateType";
import InputImage from "../../../../Elements/InputImage/InputImage";
import Title from "../../../../Elements/Title/Title";

interface ProjectSettingsFormProps {
    formState: FormStateType,
    errorState: ErrorFormStateType,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const ProjectSettingsForm:FC<ProjectSettingsFormProps> = ({formState, errorState, onChange }) => {
    const [imageSrc, setImageSrc] = useState<string>("");

    useEffect(() => {
        if(formState.logo instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(formState.logo);
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
        } else {
            setImageSrc(formState.logo ? `${process.env.REACT_APP_API_URL}/${formState.logo}`:"");
        }
    }, [formState.logo]);

    return (
        <form className={classes.form}>

            <div className={classes.formColumn}>

                <Title level={3}>
                    Основні налаштування
                </Title>

                <Input
                    type={"text"}
                    label={"Назва проекту"}
                    placeholder={"Example"}
                    name={"name"}
                    value={formState.name}
                    onChange={onChange}
                    error={errorState.name}
                />

                <InputColor
                    label={"Колір"}
                    name={"color"}
                    value={formState.color}
                    onChange={onChange}
                    error={errorState.color}
                />

                <InputImage
                    label={"Фото профілю"}
                    name={"logo"}
                    value={imageSrc}
                    onChange={onChange}
                    error={errorState.logo}
                />

                <Input
                    type={"text"}
                    label={"Instagram Token API"}
                    placeholder={"1234567890.abcd1234.abcd1234abcd1234abcd1234"}
                    name={"instagramTokenAPI"}
                    value={formState.instagramTokenAPI}
                    onChange={onChange}
                    error={errorState.instagramTokenAPI}
                />

            </div>

            <div className={classes.formColumn}>

                <Title level={3}>
                    Соціальні мережі
                </Title>

                <Input
                    type={"url"}
                    label={"Instagram"}
                    placeholder={"https://instagram.com/your_nickname/"}
                    name={"instagram"}
                    value={formState.instagram}
                    onChange={onChange}
                    error={errorState.instagram}
                />

                <Input
                    type={"url"}
                    label={"TikTok"}
                    placeholder={"https://tiktok.com/@your_nickname"}
                    name={"tiktok"}
                    value={formState.tiktok}
                    onChange={onChange}
                    error={errorState.tiktok}
                />

                <Input
                    type={"url"}
                    label={"Facebook"}
                    placeholder={"https://facebook.com/your_nickname"}
                    name={"facebook"}
                    value={formState.facebook}
                    onChange={onChange}
                    error={errorState.facebook}
                />

                <Title level={3}>
                    Макети проєкту
                </Title>

                <Input
                    type={"url"}
                    label={"Посилання на Figma"}
                    placeholder={"https://figma.com/file/id_template/"}
                    name={"linkFigma"}
                    value={formState.linkFigma}
                    onChange={onChange}
                    error={errorState.linkFigma}
                />

                <Input
                    type={"url"}
                    label={"Посилання на Canva"}
                    placeholder={"https://canva.com/design/id_template/"}
                    name={"linkCanva"}
                    value={formState.linkCanva}
                    onChange={onChange}
                    error={errorState.linkCanva}
                />

            </div>

        </form>
    );
};

export default ProjectSettingsForm;