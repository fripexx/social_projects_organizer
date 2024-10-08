import React, {FC, useEffect} from 'react';
import {useSocket} from "../../context/Socket-Context";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {setNotification, setNotifications} from "../../store/reducers/UISlice";
import {v4 as uuid} from "uuid";
import {TeamNotificationType} from "./types/TeamNotificationType";
import {NotificationType} from "../../Components/NotificationsWidget/types/NotificationType";
import {CommentPostType} from "./types/CommentPostType";
import {ChangePostStatusType} from "./types/СhangePostStatusType";

interface NotificationWrapperProps {
    children: React.ReactNode;
}

const NotificationWrapper:FC<NotificationWrapperProps> = ({children}) => {
    const socket = useSocket();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.UserReducer.user)

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

        socket.on('commentPost', (comment: CommentPostType) => {
            const {project, postId, message} = comment

            dispatch(setNotification({
                id: uuid(),
                projectName: project.name,
                message: message,
                timestamp: Date.now(),
                link: `/project/${project.id}/edit-instagram-publication?id=${postId}`,
                isRead: false
            }))
        })

        socket.on('changePostStatus', (comment: ChangePostStatusType) => {
            const {project, postId, to, message} = comment

            if(user && to.includes(user.id)) {
                dispatch(setNotification({
                    id: uuid(),
                    projectName: project.name,
                    message: message,
                    timestamp: Date.now(),
                    link: `/project/${project.id}/edit-instagram-publication?id=${postId}`,
                    isRead: false
                }))
            }
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