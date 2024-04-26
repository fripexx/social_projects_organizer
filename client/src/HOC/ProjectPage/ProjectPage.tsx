import React, {FC, ReactNode, useEffect} from 'react';
import {getProject, getProjectTeam} from "../../store/thunks/ProjectThunks";
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import Loader from "../../Elements/Loader/Loader";
import {setProject} from "../../store/reducers/ProjectSlice";
import ErrorMessagePopup from "../../Components/ErrorMessagePopup/ErrorMessagePopup";

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

    useEffect(() => {
        if (location.pathname.startsWith('/project') && params?.id) {
            if (!project || project.id !== params.id) dispatch(getProject(params.id));
        }
    }, [params.id, location.pathname, project]);
    useEffect(() => {
        if(project && project.id) dispatch(getProjectTeam(project.id))
    }, [project]);

    if (project && loading === false) {
        return (
            <>
                {children}
                <ErrorMessagePopup message={error ? error.message : null} />
            </>
        );
    } else {
        return <Loader/>
    }
};

export default ProjectPage;