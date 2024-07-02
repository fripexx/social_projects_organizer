import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import saveIcon from "../../assets/images/save_icon.svg";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import Title from "../../Elements/Title/Title";
import ProjectSettingsForm from "./Components/ProjectSettingsForm/ProjectSettingsForm";
import Backdrop from "../../Components/Backdrop/Backdrop";
import ModalConfirmAction from "../../Components/Modals/ModalConfirmAction/ModalConfirmAction";
import {FormStateType} from "./types/FormStateType";
import {ErrorFormStateType} from "./types/ErrorFormStateType";
import {editSettingsProject} from "../../store/thunks/ProjectThunks";
import {useNavigate} from "react-router-dom";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";

const ProjectSettings:FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const project = useAppSelector(state => state.ProjectReducer.project);
    const user = useAppSelector(state => state.UserReducer.user);
    const [formState, setFormState] = useState<FormStateType>({
        name: "",
        color: "",
        instagram: "",
        instagramTokenAPI: "",
        facebook: "",
        tiktok: "",
        linkFigma: "",
        linkCanva: "",
        logo: "",
    });
    const [errorState, setErrorState] = useState<ErrorFormStateType>({
        name: false,
        color: false,
        instagram: false,
        instagramTokenAPI: false,
        facebook: false,
        tiktok: false,
        linkFigma: false,
        linkCanva: false,
        logo: false,
    })
    const [saveState, setSaveState] = useState<boolean>(false)
    const [activeModal, setActiveModal] = useState<boolean>(false)

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
    const showModal = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const isInvalidName = formState.name.length === 0;
        const isInvalidInstagram = formState.instagram ? !/^(https?:\/\/)?(www\.)?(instagram\.com)\/([a-zA-Z0-9_]+)\/?$/i.test(formState.instagram) : false;
        const isInvalidInstagramTokenAPI = formState.instagramTokenAPI ? (formState.instagramTokenAPI.length < 10 || !/^[a-zA-Z]+$/.test(formState.instagramTokenAPI)) : false;        const isInvalidTikTok = formState.tiktok ? !/^(https?:\/\/)?(www\.)?(tiktok\.com)\/(@[a-zA-Z0-9_]+)\?.*$/i.test(formState.tiktok) : false;
        const isInvalidFacebook = formState.facebook ? !/^(https?:\/\/)?(www\.)?facebook\.com\/([a-zA-Z0-9.]+)\/?$/i.test(formState.facebook) : false;
        const isInvalidFigma = formState.linkFigma ? !/^https:\/\/www\.figma\.com\/file\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)?(\/?[?&].*)?$/.test(formState.linkFigma) : false;
        const isInvalidCanva = formState.linkCanva ? !/^https:\/\/www\.canva\.com\/design\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/(edit)?$/i.test(formState.linkCanva) : false;
        const isInvalidLogo = formState.logo instanceof File && formState.logo.size >= 5 * 1024 * 1024;

        if (isInvalidName || isInvalidInstagram || isInvalidInstagramTokenAPI || isInvalidTikTok || isInvalidFacebook || isInvalidFigma || isInvalidCanva || isInvalidLogo) {
            if (isInvalidName) setErrorState(prevState => ({...prevState, name: "Введіть назву проєкту"}));
            if (isInvalidInstagram) setErrorState(prevState => ({...prevState, instagram: "Введіть коректне посилання на сторінку Instagram"}));
            if (isInvalidInstagramTokenAPI) setErrorState(prevState => ({...prevState, instagramTokenAPI: "Введіть коректний access токен Instagram"}));
            if (isInvalidTikTok) setErrorState(prevState => ({...prevState, tiktok: "Введіть коректне посилання на сторінку TikTok"}));
            if (isInvalidFacebook) setErrorState(prevState => ({...prevState, facebook: "Введіть коректне посилання на сторінку Facebook"}));
            if (isInvalidFigma) setErrorState(prevState => ({...prevState, linkFigma: "Введіть коректне посилання на шаблон Figma"}));
            if (isInvalidCanva) setErrorState(prevState => ({...prevState, linkCanva: "Введіть коректне посилання на шаблон Canva"}));
            if (isInvalidLogo) setErrorState(prevState => ({...prevState, logo: "Максимальний розмір файлу 5 МБ"}));

            return false;
        }

        setErrorState({
            name: false,
            color: false,
            instagram: false,
            instagramTokenAPI: false,
            facebook: false,
            tiktok: false,
            linkFigma: false,
            linkCanva: false,
            logo: false,
        });

        setActiveModal(true);
    }
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveModal(false);
    }
    const saveRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in formState) if (formState.hasOwnProperty(key)) formData.append(key, formState[key]);
        if (project?.id) formData.append("id", project.id);

        dispatch(editSettingsProject(formData));

        setActiveModal(false);
        setSaveState(false);
    }

    useEffect(() => {
        if (project) {
            setFormState({
                name: project?.name ? project.name : "",
                color: project?.color ? project.color : "",
                instagram: project?.instagram ? project.instagram : "",
                instagramTokenAPI: project?.instagramTokenAPI ? project.instagramTokenAPI : "",
                facebook: project?.facebook ? project.facebook : "",
                tiktok: project?.tiktok ? project.tiktok : "",
                linkFigma: project?.linkFigma ? project.linkFigma : "",
                linkCanva: project?.linkCanva ? project.linkCanva : "",
                logo: project && project?.logo && typeof project.logo !== "string" && project.logo.cropped ? project.logo.cropped["300"] : "",
            })
        }
    }, [project]);
    useEffect(() => {
        if (project && user && project.administrator !== user?.id) navigate(`/project/${project.id}/posts`)
    }, [project, user])

    return (
        <Page>

            <SidebarProject/>

            <ContentPage>

                <HeaderPage>

                    <Title level={2}>
                        Налаштування проєкту
                    </Title>

                    {saveState &&
                        <Button
                            text={"Зберегти"}
                            icon={saveIcon}
                            iconColor={"var(--Color-Green)"}
                            style={{marginLeft: "auto"}}
                            onClick={showModal}
                        />
                    }

                </HeaderPage>

                <Content>

                    <ProjectSettingsForm
                        formState={formState}
                        errorState={errorState}
                        onChange={onChangeInput}
                    />

                </Content>

            </ContentPage>

            <Backdrop isOpen={activeModal}>
                <ModalConfirmAction
                    text={"Ви впевнені що ви хочете змінити дані проєкту?"}
                    onCancel={closeModal}
                    onConfirm={saveRequest}
                />
            </Backdrop>

        </Page>
    );
};

export default ProjectSettings;