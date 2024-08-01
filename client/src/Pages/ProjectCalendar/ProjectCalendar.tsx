import React from 'react';
import classes from "./ProjectCalendar.module.scss";
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Content from "../../Components/Content/Content";
import Calendar from "../../Components/Calendar/Calendar";


const ProjectCalendar = () => {
    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage>
                        calendar
                    </HeaderPage>

                    <Content>
                        <Calendar/>
                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default ProjectCalendar;