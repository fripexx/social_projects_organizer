import React, {FC, useEffect, useState} from 'react';
import classes from "./NotificationsWidget.module.scss";
import {NotificationType} from "./types/NotificationType";
import NotificationsButton from "./Components/NotificationsButton/NotificationsButton";
import Backdrop from "../Backdrop/Backdrop";
import NotificationsList from "./Components/NotificationsList/NotificationsList";

export type readNotificationCallback = (id: string) => void;

interface NotificationsWidgetProps {
    notifications: NotificationType[],
    readCallback?: readNotificationCallback
}

const initialLastNotification:NotificationType = {
    id: "",
    message: "",
    timestamp: Date.now(),
    link: "",
    isRead: false,
}

const NotificationsWidget: FC<NotificationsWidgetProps> = ({notifications, readCallback}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);

    const toggleWidget = () => {
        setIsOpen(prevState => !prevState);
    }
    const hideWidget = () => {
        setIsOpen(false);
    }
    const readHandler = (id: string): void => {
        if(readCallback) setTimeout(() => readCallback(id), 1000)
    }

    useEffect(() => {
        const unreadNotifications = notifications.filter(notification => !notification.isRead)

        setUnreadCount(unreadNotifications.length)
        setHasNewNotification(true);
        setTimeout(() => setHasNewNotification(false), 1000)
    }, [notifications]);

    return (
        <>
            <Backdrop isOpen={isOpen} clickCallback={hideWidget}>

                {notifications.length !== 0 &&
                    <NotificationsList
                        isOpen={isOpen}
                        notifications={notifications}
                        hideCallback={hideWidget}
                        readCallback={readHandler}
                    />
                }
            </Backdrop>

            <div className={classes.container}>

                <NotificationsButton
                    className={classes.showButton}
                    show={notifications.length !== 0}
                    count={unreadCount}
                    isOpen={isOpen}
                    clickCallback={toggleWidget}
                    startAnimation={hasNewNotification}
                />

            </div>
        </>
    );
};

export default NotificationsWidget;