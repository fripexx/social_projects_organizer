import React, {FC} from 'react';
import classes from "./ProjectCard.module.scss";
import {ProjectType} from "../../store/types/ProjectType";
import Logo from "../Logo/Logo";
import {NavLink} from "react-router-dom";

interface ProjectCardProps {
    project: ProjectType,
}

const ProjectData: FC<ProjectCardProps> = ({project}) => {
    const {name, logo, customer} = project;

    return (
        <>
            <Logo photo={typeof logo !== 'string' ? logo : null }/>

            <div className={classes.info}>

                <span className={classes.name}>
                    {name}
                </span>

                {customer !== null && typeof customer === "object" &&
                    <span className={classes.customer}>
                        {customer.name} {customer.surname}
                    </span>
                }

            </div>
        </>
    )
}

const ProjectCard:FC<ProjectCardProps> = ({project}) => {
    const {id, color, isActive} = project;

    return (
        <>
            {isActive ? (
                <NavLink to={`/project/${id}/posts`} className={classes.activeProject} style={color ? {backgroundColor: color} : {}}>
                    <ProjectData project={project}/>
                </NavLink>
            ) : (
                <div className={classes.noActiveProject}>
                    <ProjectData project={project}/>
                </div>
            )}

        </>

    );
};

export default ProjectCard;