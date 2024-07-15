import React, {FC, ReactNode, useEffect} from 'react';
import {useSocket} from "../../context/Socket-Context";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {getProjects} from "../../store/thunks/UserThunks";

interface RoomsConnectionProps {
    children: ReactNode;
}

const RoomsConnection:FC<RoomsConnectionProps> = ({children}) => {
    const socket = useSocket();
    const projects = useAppSelector(state => state.UserReducer.projects);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, []);
    useEffect(() => {
        if(projects.length !== 0) {
            const projectIds = projects.map(project => project.id);
            projectIds.forEach(projectId => socket.emit("joinRoom", {room: projectId, model: "Project"}))
        }
    }, [projects])
    useEffect(() => {
        socket.on('joinedRoom', (room: string) => console.log(`join to ${room}`));
    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default RoomsConnection;