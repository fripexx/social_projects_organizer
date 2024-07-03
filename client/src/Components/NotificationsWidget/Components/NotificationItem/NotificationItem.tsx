import React, {FC, useEffect, useRef} from 'react';
import classes from "./NotificationItem.module.scss";
import classNames from "classnames";
import {NotificationType} from "../../types/NotificationType";
import {NavLink} from "react-router-dom";
import {readNotificationCallback} from "../../NotificationsWidget";

interface NotificationItemProps {
    notification: NotificationType;
    hideCallback: () => void;
    readCallback?: readNotificationCallback;
    className?: string;
}

const NotificationItem: FC<NotificationItemProps> = ({notification, hideCallback, readCallback, className}) => {
    const {id, message, link, isRead, timestamp} = notification
    const time = new Date(timestamp).toLocaleTimeString("uk-UA",{hour: "2-digit", minute: "2-digit" });
    const date = new Date(timestamp).toLocaleDateString();
    const notificationRef = useRef<HTMLDivElement>(null);

    const onClick = () => {
        hideCallback()
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isRead && readCallback) readCallback(id)
                });
            },
            {threshold: 0.1}
        );

        if (notificationRef.current) observer.observe(notificationRef.current);

        return () => {
            if (notificationRef.current) observer.unobserve(notificationRef.current);
        };
    }, [id]);

    return (
        <div className={classNames(classes.container, className)} ref={notificationRef} data-is-read={isRead}>

            <div className={classes.message}>{message}</div>

            <div className={classes.footer}>

                <span className={classes.time}>{date} {time}</span>

                {link &&
                    <NavLink
                        to={link}
                        className={classes.button}
                        children={"Перейти"}
                        onClick={onClick}
                    />
                }

            </div>

        </div>
    );
};

export default NotificationItem;