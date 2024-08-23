import React, {useState} from 'react';
import plusIcon from "../../assets/images/icons/plus-icon.svg";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Title from "../../Elements/Title/Title";
import Content from "../../Components/Content/Content";
import Button from "../../Elements/Button/Button";
import TeamList from "../../Components/TeamList/TeamList";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {addUserInTeam} from "../../store/thunks/ProjectThunks";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import ModalAddUser from "./Components/ModalAddUser/ModalAddUser";
import {rolesList} from "../../constants/rolesList";

const ProjectTeams = () => {
    const project = useAppSelector(state => state.ProjectReducer.project);
    const user = useAppSelector(state => state.UserReducer.user);
    const team = useAppSelector(state => state.ProjectReducer.team);
    const dispatch = useAppDispatch()

    const [addModal, setAddModal] = useState<boolean>(false)
    const [addEmail, setAddEmail] = useState<string>("")
    const [addRole, setAddRole] = useState<string>(rolesList[0].value)

    const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setAddModal(true)
        setAddEmail("")
    }
    const hideModalCallback = () => {
        setAddModal(false)
        setAddEmail("")
    }
    const changeEmailHandler = (email: string) => {
        setAddEmail(email);
    }
    const changeRoleHandler = (role: string) => {
        setAddRole(role);
    }
    const addUserCallback = () => {
        if(project) {
            dispatch(addUserInTeam({
                projectId: project.id,
                email: addEmail,
                role: addRole
            }));
            setAddModal(false)
            setAddEmail("")
        }
    }

    return (
        <Page>

            <SidebarProject/>

            <ContentPage>

                <HeaderPage>

                    <Title level={2}>
                        Команда
                    </Title>

                    {project && user && project.administrator === user.id &&
                        <Button
                            text={"Додати юзера"}
                            icon={plusIcon}
                            iconColor={"var(--Color-Green)"}
                            style={{marginLeft: "auto"}}
                            onClick={showModal}
                        />
                    }

                </HeaderPage>

                <Content>

                    {team &&
                        <TeamList team={team} />
                    }

                </Content>

            </ContentPage>

            <ModalAddUser
                isOpen={addModal}
                email={addEmail}
                setEmailCallback={changeEmailHandler}
                role={addRole}
                setRoleCallback={changeRoleHandler}
                addUserCallback={addUserCallback}
                hideCallback={hideModalCallback}
            />

        </Page>
    );
};

export default ProjectTeams;