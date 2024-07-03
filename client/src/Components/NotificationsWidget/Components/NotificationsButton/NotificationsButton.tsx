import React, {FC} from 'react';
import classes from "./NotificationsButton.module.scss";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import iconBell from "../../../../assets/images/icon-bell.svg";

interface NotificationButtonProps {
    isOpen: boolean;
    show: boolean;
    count: number;
    startAnimation: boolean;
    clickCallback: () => void;
    className?: string;
}

const NotificationsButton:FC<NotificationButtonProps> = ({isOpen, clickCallback, show, count, startAnimation, className}) => {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        clickCallback();
    }

    return (
        <div
            className={classNames(classes.button, className)}
            onClick={onClick}
            data-is-open={isOpen}
            data-show={show}
            data-animation={startAnimation}
        >
            <span className={classes.count} data-show={count !== 0}>{count <= 99 ? count : 99 }</span>
            <ReactSVG src={iconBell}/>
        </div>
    );
};

export default NotificationsButton;