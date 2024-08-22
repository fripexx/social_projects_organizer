import React, {FC, useEffect, useState} from 'react';
import classes from "./UserProjects.module.scss";
import {addProject, getProjects} from "../../store/thunks/UserThunks";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import plusIcon from "../../assets/images/plus_icon.svg";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Title from "../../Elements/Title/Title";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import Backdrop from "../../Components/Backdrop/Backdrop";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import Modal from "../../Components/Modals/Modal/Modal";
import Select from "../../Elements/Select/Select";
import Input from "../../Elements/Input/Input";
import {rolesList} from "../../constants/rolesList";

const UserProjects:FC = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(state => state.UserReducer.projects);

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [addProjectName, setAddProjectName] = useState<string>("")
    const [addProjectUserRole, setAddProjectUserRole] = useState<string>(rolesList[0] ? rolesList[0].value : "")

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
            dispatch(addProject({name: addProjectName, role: addProjectUserRole}));
            setActiveModal(false);
            setAddProjectName("");
        }
    }
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAddProjectName(e.currentTarget.value);
    }
    const handleChangeRole = (value: string) => {
        setAddProjectUserRole(value)
    }

    useEffect(() => {
        dispatch(getProjects());
    }, []);

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

            <Backdrop isOpen={activeModal}>
                <Modal className={classes.modal}>

                    <Select
                        value={addProjectUserRole}
                        options={rolesList}
                        onChange={handleChangeRole}
                        label={"Оберіть вашу роль в проєкті"}
                        dropdownType={"relative"}
                    />

                    <Input
                        type={"text"}
                        label={"Введіть назву проєкту"}
                        placeholder={"..."}
                        value={addProjectName}
                        onChange={handleChangeName}
                    />

                    <footer className={classes.footer}>

                        <Button
                            text={"Закрити"}
                            onClick={hideModal}
                            styleType={"grey-blue"}
                        />

                        <Button
                            text={"Додати"}
                            onClick={addProjectHandler}
                        />

                    </footer>

                </Modal>
            </Backdrop>

        </Page>
    );
};

export default UserProjects;