import React, {FC, useEffect} from 'react';
import {useSocket} from "../../context/Socket-Context";
import {useAppDispatch} from "../../store/hooks/redux";
import {setNotification, setNotifications} from "../../store/reducers/UISlice";
import {v4 as uuid} from "uuid";
import {TeamNotificationType} from "./types/TeamNotificationType";
import {NotificationType} from "../../Components/NotificationsWidget/types/NotificationType";

interface NotificationWrapperProps {
    children: React.ReactNode;
}

const NotificationWrapper:FC<NotificationWrapperProps> = ({children}) => {
    const socket = useSocket();
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket.on('teamNotification', (notification: TeamNotificationType) => {
            const {project, message} = notification

            dispatch(setNotification({
                id: uuid(),
                projectName: project.name,
                message: message,
                timestamp: Date.now(),
                link: `/project/${project.id}/teams`,
                isRead: false
            }))
        })
    }, []);
    useEffect(() => {
        const localStorageNotifications = localStorage.getItem('SPONotifications');

        if(localStorageNotifications) {
            const localNotifications:NotificationType[] = JSON.parse(localStorageNotifications);
            dispatch(setNotifications( localNotifications.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))))
        }
    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default NotificationWrapper;