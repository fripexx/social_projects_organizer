import React, {FC, ReactNode, useEffect} from 'react';
import {getProject, getProjectTeam} from "../../store/thunks/ProjectThunks";
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import Loader from "../../Elements/Loader/Loader";
import ErrorMessagePopup from "../../Components/ErrorMessagePopup/ErrorMessagePopup";
import NotificationsWidget from "../../Components/NotificationsWidget/NotificationsWidget";
import {readNotification} from "../../store/reducers/UISlice";

interface ProjectPageProps {
    children: ReactNode
}

const ProjectPage: FC<ProjectPageProps> = ({children}) => {
    const dispatch = useAppDispatch();
    const location = useLocation()
    const params = useParams()
    const project = useAppSelector(state => state.ProjectReducer.project)
    const loading = useAppSelector(state => state.ProjectReducer.isLoading)
    const error = useAppSelector(state => state.ProjectReducer.error)
    const notifications = useAppSelector(state => state.UIReducer.notifications)

    const readNotificationCallback = (id: string): void => {
        dispatch(readNotification(id))
    }

    useEffect(() => {
        if (location.pathname.startsWith('/project') && params?.id) {
            if (!project || project.id !== params.id) dispatch(getProject(params.id));
        }
    }, [params.id, location.pathname, project]);
    useEffect(() => {
        if (project && project.id) dispatch(getProjectTeam(project.id))
    }, [project]);

    return (
        <>
            {(project && !loading) ? (
                <>
                    {children}
                    <ErrorMessagePopup message={error ? error.message : null} />
                    <NotificationsWidget notifications={notifications} readCallback={readNotificationCallback}/>
                </>
            ) : (
                <Loader/>
            )}
        </>
    );
};

export default ProjectPage;