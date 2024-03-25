import React, {FC} from 'react';
import classes from "./ProjectCard.module.scss";
import {ProjectType} from "../../store/types/ProjectType";
import Logo from "../Logo/Logo";

interface ProjectCardProps {
    project: ProjectType,
}

const ProjectCard:FC<ProjectCardProps> = ({project}) => {
    const {id, name, logo, color, isActive} = project;

    return (
        <>
            {isActive ? (
                <a href={`/project/${id}`} className={classes.activeProject} style={color ? {backgroundColor: color} : {}}>

                    {typeof logo !== 'string' &&
                        <Logo photo={logo}/>
                    }

                    <div className={classes.info}>

                        <span className={classes.name}>
                            {name}
                        </span>

                        <span className={classes.customer}>
                            Customer
                        </span>

                    </div>

                </a>
            ) : (
                <div className={classes.noActiveProject}>

                    {typeof logo !== 'string' &&
                        <Logo photo={logo}/>
                    }

                    <div className={classes.info}>

                        <span className={classes.name}>
                            {name}
                        </span>

                        <span className={classes.customer}>
                            Customer
                        </span>

                    </div>

                </div>
            )}

        </>

    );
};

export default ProjectCard;