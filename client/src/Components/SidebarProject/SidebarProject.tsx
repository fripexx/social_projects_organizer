import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {routes} from "../../Routes/routes";
import {showChat} from "../../store/reducers/GeneralChatSlice";
import {useLocation} from "react-router-dom";
import Menu from "../Menu/Menu";
import ProjectSummary from "../ProjectSummary/ProjectSummary";
import GeneralChatWidget from "../GeneralChatWidget/GeneralChatWidget";
import Sidebar from "../Sidebar/Sidebar";
import GeneralChatSidebar from "../GeneralChatSidebar/GeneralChatSidebar";
import Chat from "../Chat/Chat";

const SidebarProject: FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const projectRoutes = routes.filter(route => route.showInProjectMenu);
    const project = useAppSelector(state => state.ProjectReducer.project)
    const showGeneralChat = useAppSelector(state => state.GeneralChatSlice.showGeneralChat)
    const team = useAppSelector(state => state.ProjectReducer.team);
    const user = useAppSelector(state => state.UserReducer.user)

    const showSidebar = () => {
        dispatch(showChat(true))
    }
    const hideSidebar = () => {
        dispatch(showChat(false))
    }

    return (
        <>
            <Sidebar>

                {project && location.pathname.indexOf("/project/") === 0  &&
                    <>

                        <ProjectSummary project={project}/>

                        <Menu links={projectRoutes}/>

                        <GeneralChatWidget
                            callback={showSidebar}
                            countMessage={1}
                        />

                    </>
                }

            </Sidebar>

            {project && user &&
                <GeneralChatSidebar showSidebar={showGeneralChat} hideCallback={hideSidebar} project={project}>
                    <Chat
                        chat={project.id}
                        model={'Project'}
                        team={team}
                        currentUser={user}
                    />
                </GeneralChatSidebar>
            }
        </>
    );
};

export default SidebarProject;