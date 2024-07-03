import React, {FC, ReactNode, useEffect, useState} from 'react';
import {getProject, getProjectTeam} from "../../store/thunks/ProjectThunks";
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import Loader from "../../Elements/Loader/Loader";
import ErrorMessagePopup from "../../Components/ErrorMessagePopup/ErrorMessagePopup";
import {useSocket} from "../../context/Socket-Context";
import {Socket} from "socket.io-client";
import {setNotifications} from "../../store/reducers/UISlice";
import {NotificationType} from "../../Components/NotificationsWidget/types/NotificationType";

interface ProjectPageProps {
    children: ReactNode
}

const ProjectPage: FC<ProjectPageProps> = ({children}) => {
    const dispatch = useAppDispatch();
    const socket = useSocket();
    const location = useLocation()
    const params = useParams()
    const project = useAppSelector(state => state.ProjectReducer.project)
    const loading = useAppSelector(state => state.ProjectReducer.isLoading)
    const error = useAppSelector(state => state.ProjectReducer.error)
    const [projectConnected, setProjectConnected] = useState<boolean>(false)
    useEffect(() => {
        if (location.pathname.startsWith('/project') && params?.id) {
            if (!project || project.id !== params.id) dispatch(getProject(params.id));
        }
    }, [params.id, location.pathname, project]);
    useEffect(() => {
        if (project && project.id) dispatch(getProjectTeam(project.id))
        if (project && !projectConnected) {
            const socketRoom: Socket = socket.emit('joinProject', {projectId: project.id, model: "Project"});
            setProjectConnected(socketRoom.connected)
        }
    }, [project]);

    useEffect(() => {
        const localStorageNotifications = localStorage.getItem('SPONotifications');

        if(localStorageNotifications) {
            const localNotifications:NotificationType[] = JSON.parse(localStorageNotifications);
            dispatch(setNotifications( localNotifications.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))))
        }
    }, []);

    return (
        <>
            {(project && !loading) ? (
                <>
                    {children}
                    <ErrorMessagePopup message={error ? error.message : null} />
                </>
            ) : (
                <Loader/>
            )}

        </>
    );
};

export default ProjectPage;