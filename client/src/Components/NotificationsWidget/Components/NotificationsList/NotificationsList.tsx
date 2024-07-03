import React, {FC} from 'react';
import classes from "./NotificationsList.module.scss";
import {NotificationType} from "../../types/NotificationType";
import {readNotificationCallback} from "../../NotificationsWidget";
import NotificationItem from "../NotificationItem/NotificationItem";

interface NotificationsListProps {
    isOpen: boolean;
    notifications: NotificationType[],
    hideCallback: () => void,
    readCallback?: readNotificationCallback;
}

const NotificationsList: FC<NotificationsListProps> = ({isOpen, notifications, hideCallback, readCallback}) => {
    return (
        <div className={classes.container} data-is-open={isOpen}>

            {notifications.map((notification) => {
                return (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        hideCallback={hideCallback}
                        readCallback={readCallback}
                    />
                )
            })}

        </div>
    );
};

export default NotificationsList;