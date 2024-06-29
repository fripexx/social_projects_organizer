import React, {CSSProperties, FC} from 'react';
import classes from "./ReelsButtons.module.scss";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import heartIcon from "../images/heart-icon.svg";
import commentIcon from "../images/comment-icon.svg";
import sendIcon from "../images/send-icon.svg";
import dotsIcon from "../images/dots-icon.svg"

interface ReelsHeaderProps {
    className?: string;
    style?: CSSProperties;
}

const ReelsButtons:FC<ReelsHeaderProps> = ({className, style}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <div className={classes.button}>
                <ReactSVG className={classes.likeIcon} src={heartIcon}/>
                <span>64</span>
            </div>

            <div className={classes.button}>
                <ReactSVG className={classes.commentIcon} src={commentIcon}/>
                <span>3</span>
            </div>

            <div className={classes.button}>
                <ReactSVG className={classes.sendIcon} src={sendIcon}/>
            </div>

            <div className={classes.button}>
                <ReactSVG className={classes.dotsIcon} src={dotsIcon}/>
            </div>

        </div>
    );
};

export default ReelsButtons;