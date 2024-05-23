import React, {useState} from 'react';
import saveIcon from "../../assets/images/save_icon.svg";
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Title from "../../Elements/Title/Title";
import Content from "../../Components/Content/Content";
import Button from "../../Elements/Button/Button";
import TeamList from "../../Components/TeamList/TeamList";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {addUserInTeam} from "../../store/thunks/ProjectThunks";
import ModalBackdrop from "../../Components/ModalBackdrop/ModalBackdrop";
import ModalInputText from "../../Components/Modals/ModalInputText/ModalInputText";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";

const ProjectTeams = () => {
    const project = useAppSelector(state => state.ProjectReducer.project);
    const team = useAppSelector(state => state.ProjectReducer.team);
    const dispatch = useAppDispatch()

    const [addModal, setAddModal] = useState<boolean>(false)
    const [addEmail, setAddEmail] = useState<string>("")

    const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setAddModal(true)
        setAddEmail("")
    }
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddModal(false)
        setAddEmail("")
    }
    const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAddEmail(e.target.value);
    }
    const addUserCallback = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(project) {
            dispatch(addUserInTeam({projectId: project.id, email: addEmail}));
            setAddModal(false)
            setAddEmail("")
        }
    }

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage>

                        <Title level={2}>
                            Команда
                        </Title>

                        <Button
                            text={"Додати юзера"}
                            icon={saveIcon}
                            iconColor={"var(--Color-Green)"}
                            style={{marginLeft: "auto"}}
                            onClick={showModal}
                        />

                    </HeaderPage>

                    <Content>

                        {team &&
                            <TeamList team={team} />
                        }

                    </Content>

                </ContentPage>

                <ModalBackdrop isOpen={addModal}>
                    <ModalInputText
                        type={"email"}
                        text={addEmail}
                        placeholderText={"Введіть пошту юзера"}
                        onChangeText={changeEmailHandler}
                        onCancel={closeModal}
                        onConfirm={addUserCallback}
                    />
                </ModalBackdrop>

            </Page>

        </ProjectPage>
    );
};

export default ProjectTeams;