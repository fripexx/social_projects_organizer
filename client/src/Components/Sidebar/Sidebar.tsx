import React, {FC, useEffect, useState} from 'react';
import classes from "./Sidebar.module.scss";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {routes} from "../../Routes/routes";
import CardUser from "../CardUser/CardUser";
import Menu from "../Menu/Menu";
import {logout} from "../../store/thunks/UserThunks";
import ProjectSummary from "../ProjectSummary/ProjectSummary";
import {useLocation} from "react-router-dom";

const Sidebar: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation()
    const user = useAppSelector(state => state.UserReducer.user)
    const project = useAppSelector(state => state.ProjectReducer.project)
    const userRoutes = routes.filter(route => route.showInUserMenu);
    const projectRoutes = routes.filter(route => route.showInProjectMenu);

    const onClickLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        dispatch(logout())
    };

    return (
        <div className={classes.container}>

            {project && location.pathname.indexOf("/project/") === 0  &&
                <ProjectSummary project={project}/>
            }

            {user && location.pathname.indexOf("/project/") === -1  &&
                <CardUser user={user}/>
            }

            <Menu links={project ? projectRoutes : userRoutes}/>

            <button className={classes.logout} onClick={onClickLogout}>

                <svg width={"20px"} height={"20px"} className="svg-icon" viewBox="0 0 1024 1024" version="1.1">
                    <path d="M320 64a32 32 0 1 0 0 64V64z m480 32V64v32z m128 128h-32 32z m0 576h32-32z m-128 128v32-32z m-480-32a32 32 0 1 0 0 64v-64z m416-352a32 32 0 1 0 0-64v64zM160 480a32 32 0 1 0 0 64v-64z m150.624-137.376a32 32 0 0 0-45.248-45.248l45.248 45.248zM96 512l-22.624-22.624a32 32 0 0 0 0 45.248L96 512z m169.376 214.624a32 32 0 0 0 45.248-45.248l-45.248 45.248zM320 128h480V64H320v64z m576 96v576h64V224h-64z m-96 672H320v64h480v-64z m96-96a96 96 0 0 1-96 96v64a160 160 0 0 0 160-160h-64zM800 128a96 96 0 0 1 96 96h64a160 160 0 0 0-160-160v64z m-64 352H160v64h576v-64zM265.376 297.376l-192 192 45.248 45.248 192-192-45.248-45.248z m-192 237.248l192 192 45.248-45.248-192-192-45.248 45.248z"/>
                </svg>

                <span>Вийти</span>

            </button>

        </div>
    );
};

export default Sidebar;