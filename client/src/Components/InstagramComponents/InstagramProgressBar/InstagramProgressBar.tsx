import React, {FC} from 'react';
import classes from "./InstagramProgressBar.module.scss";
import classNames from "classnames";

interface InstagramProgressBarProps {
    progress: number,
    className?: string,
}

const InstagramProgressBar:FC<InstagramProgressBarProps> = ({progress, className}) => {
    return (
        <div className={classNames(classes.currentItem, className)}>
            <div className={classes.loader} style={{width: `${progress}%`}}/>
        </div>
    );
};

export default InstagramProgressBar;