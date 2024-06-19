import React, {FC} from 'react';
import classes from "./NotificationsButton.module.scss";
import {ReactSVG} from "react-svg";
import iconBell from "../../../../assets/images/icon-bell.svg";

interface NotificationButtonProps {
    isOpen: boolean,
    show: boolean,
    clickCallback: () => void,
}

const NotificationsButton:FC<NotificationButtonProps> = ({isOpen, clickCallback, show}) => {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        clickCallback();
    }

    return (
        <div className={classes.button} onClick={onClick} data-is-open={isOpen} data-show={show}>
            <ReactSVG src={iconBell}/>
        </div>
    );
};

export default NotificationsButton;