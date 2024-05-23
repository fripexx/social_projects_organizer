import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {routes} from "../../Routes/routes";
import {useLocation} from "react-router-dom";
import Menu from "../Menu/Menu";
import ProjectSummary from "../ProjectSummary/ProjectSummary";
import GeneralChatWidget from "../GeneralChatWidget/GeneralChatWidget";
import Sidebar from "../Sidebar/Sidebar";
import GeneralChatSidebar from "../GeneralChatSidebar/GeneralChatSidebar";
import {showChat} from "../../store/reducers/UISlice";
import Chat from "../Chat/Chat";

const SidebarProject: FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const project = useAppSelector(state => state.ProjectReducer.project)
    const showGeneralChat = useAppSelector(state => state.UIReducer.showGeneralChat)
    const projectRoutes = routes.filter(route => route.showInProjectMenu);

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

            <GeneralChatSidebar showSidebar={showGeneralChat} hideCallback={hideSidebar}>
                <Chat/>
            </GeneralChatSidebar>
        </>
    );
};

export default SidebarProject;