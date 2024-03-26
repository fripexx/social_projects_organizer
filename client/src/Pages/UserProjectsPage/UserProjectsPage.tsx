import React, {FC, useEffect, useState} from 'react';
import classes from "./UserProjectsPage.module.scss";
import {addProject, getProjects} from "../../store/thunks/UserThunks";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import plusIcon from "../../assets/images/plus_icon.svg";
import Page from "../../Components/Page/Page";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Title from "../../Elements/Title/Title";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import ModalBackdrop from "../../Components/ModalBackdrop/ModalBackdrop";
import ModalInputText from "../../Components/Modals/ModalInputText/ModalInputText";

const UserProjectsPage:FC = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(state => state.UserReducer.projects);

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [addProjectName, setAddProjectName] = useState<string>("")

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const showModal = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveModal(true)
    }
    const hideModal = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveModal(false)
        setAddProjectName("")
    }
    const addProjectHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(addProjectName){
            dispatch(addProject(addProjectName));
            setActiveModal(false);
            setAddProjectName("");
        }

    }
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAddProjectName(e.currentTarget.value);
    }
    return (
        <Page>

            <SidebarUser/>

            <ContentPage>

                <HeaderPage>

                    <Title level={2}>
                        Проєкти
                    </Title>

                    <Button
                        text={"Додати"}
                        icon={plusIcon}
                        iconColor={"var(--Color-Green)"}
                        style={{marginLeft: "auto"}}
                        onClick={showModal}
                    />

                </HeaderPage>

                <Content>

                    <div className={classes.projects}>
                        {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
                    </div>

                </Content>

            </ContentPage>

            <ModalBackdrop isOpen={activeModal}>
                <ModalInputText
                    text={addProjectName}
                    placeholderText={"Введіть назву проєкту"}
                    onChangeText={onChangeName}
                    onCancel={hideModal}
                    onConfirm={addProjectHandler}
                />
            </ModalBackdrop>

        </Page>
    );
};

export default UserProjectsPage;