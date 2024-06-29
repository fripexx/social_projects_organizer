import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramStoriesFooter.module.scss";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import heartIcon from "../images/heart-icon.svg";
import sendIcon from "../images/send-icon.svg";

interface InstagramStoriesFooterProps {
    className?: string;
    style?: CSSProperties;
}

const InstagramStoriesFooter:FC<InstagramStoriesFooterProps> = ({className, style}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <div className={classes.field}>
                <span>Надіслати повідомлення</span>
            </div>

            <div className={classes.buttons}>

                <ReactSVG className={classes.likeIcon} src={heartIcon}/>

                <ReactSVG className={classes.sendIcon} src={sendIcon}/>

            </div>

        </div>
    );
};

export default InstagramStoriesFooter;