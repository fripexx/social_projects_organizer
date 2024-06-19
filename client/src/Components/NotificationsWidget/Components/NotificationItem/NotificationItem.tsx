import React, {FC} from 'react';
import classes from "./NotificationItem.module.scss";
import {NotificationType} from "../../types/NotificationType";
import Button from "../../../../Elements/Button/Button";
import {NavLink} from "react-router-dom";

interface NotificationItemProps {
    notification: NotificationType,
    hideCallback: () => void
}

const NotificationItem: FC<NotificationItemProps> = ({notification, hideCallback}) => {
    const {message, link} = notification

    const onClick = () => {
        hideCallback()
    }

    return (
        <div className={classes.container}>

            <div className={classes.message}>{message}</div>

            {link &&
                <NavLink
                    to={link}
                    className={classes.button}
                    children={"Перейти"}
                    onClick={onClick}
                />
            }

        </div>
    );
};

export default NotificationItem;