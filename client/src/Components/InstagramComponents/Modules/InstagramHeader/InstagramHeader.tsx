import React, {FC} from 'react';
import classes from "./InstagramHeader.module.scss";
import {ReactSVG} from "react-svg";
import backIcon from "../images/back-icon.svg"

interface InstagramHeaderProps {
    name: string;
}

const InstagramHeader:FC<InstagramHeaderProps> = ({name}) => {
    return (
        <div className={classes.container}>

            <ReactSVG className={classes.button} src={backIcon}/>

            <div className={classes.centerField}>

                <span className={classes.profileName}>
                    {name}
                </span>

                <span className={classes.label}>
                    Дописи
                </span>

            </div>

        </div>
    );
};

export default InstagramHeader;