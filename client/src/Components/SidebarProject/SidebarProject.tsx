import React, {FC} from 'react';
import {useAppSelector} from "../../store/hooks/redux";
import {routes} from "../../Routes/routes";
import {useLocation} from "react-router-dom";
import Menu from "../Menu/Menu";
import ProjectSummary from "../ProjectSummary/ProjectSummary";
import GeneralChatWidget from "../GeneralChatWidget/GeneralChatWidget";
import Sidebar from "../Sidebar/Sidebar";

const SidebarProject: FC = () => {
    const location = useLocation()
    const project = useAppSelector(state => state.ProjectReducer.project)
    const projectRoutes = routes.filter(route => route.showInProjectMenu);

    return (
        <Sidebar>

            {project && location.pathname.indexOf("/project/") === 0  &&
                <>

                    <ProjectSummary project={project}/>

                    <Menu links={projectRoutes}/>

                    <GeneralChatWidget
                        callback={() => {}}
                        link={`/project/${project.id}/general-chat`}
                        countMessage={1}
                    />

                </>
            }

        </Sidebar>
    );
};

export default SidebarProject;