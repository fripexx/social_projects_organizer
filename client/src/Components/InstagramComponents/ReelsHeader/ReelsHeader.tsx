import React, {CSSProperties, FC} from 'react';
import classes from "./ReelsHeader.module.scss";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import backIcon from "../images/back-icon.svg";
import cameraIcon from "../images/camera-icon.svg";

interface ReelsHeaderProps {
    className?: string;
    style?: CSSProperties;
}

const ReelsHeader: FC<ReelsHeaderProps> = ({className, style}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <ReactSVG className={classes.back} src={backIcon}/>

            <span className={classes.text}>
                Ваші відео Reels
            </span>

            <ReactSVG className={classes.camera} src={cameraIcon}/>

        </div>
    );
};

export default ReelsHeader;