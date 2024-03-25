import React, {FC, useEffect} from 'react';
import classes from "./UserProjectsPage.module.scss";
import {getProjects} from "../../store/thunks/UserThunks";
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

const UserProjectsPage:FC = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(state => state.UserReducer.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

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
                        onClick={() => {}}
                    />

                </HeaderPage>

                <Content>

                    <div className={classes.projects}>
                        {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
                    </div>

                </Content>

            </ContentPage>

        </Page>
    );
};

export default UserProjectsPage;