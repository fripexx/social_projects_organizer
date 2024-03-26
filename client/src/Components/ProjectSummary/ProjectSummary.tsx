import React, {FC} from 'react';
import classes from "./ProjectSummary.module.scss";
import {ProjectType} from "../../store/types/ProjectType";
import Logo from "../Logo/Logo";

interface ProjectSummaryProps {
    project: ProjectType;
    [key: string]: any;
}

const ProjectSummary:FC<ProjectSummaryProps> = ({project, ...rest}) => {
    const {name, logo, color, } = project;

    return (
        <div className={classes.container} {...rest} style={color ? {backgroundColor: color} : {}}>

            {typeof logo !== 'string' &&
                <Logo photo={logo}/>
            }

            <span className={classes.name}>
                {name}
            </span>

        </div>
    );
};

export default ProjectSummary;