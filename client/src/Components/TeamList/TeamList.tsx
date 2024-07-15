import React, {FC, useEffect} from 'react';
import classes from "./TeamList.module.scss";
import TeamUser, {
    ChangeAdminCallbackType,
    ChangeRoleCallbackType,
    DeleteCallbackType,
    LeaveCallbackType
} from "../TeamUser/TeamUser";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {
    changeProjectAdministrator,
    changeRoleUser,
    leaveProject,
    removeUserFromTeam
} from "../../store/thunks/ProjectThunks";
import {TeamMemberType} from "../../store/types/TeamMemberType";

interface TeamListProps extends React.HTMLProps<HTMLDivElement> {
    team: TeamMemberType[],
}

const TeamList:FC<TeamListProps> = ({team, ...rest}) => {
    const user = useAppSelector(state => state.UserReducer.user)
    const project = useAppSelector(state => state.ProjectReducer.project);
    const dispatch = useAppDispatch();

    const deleteCallback: DeleteCallbackType = (id: string): void => {
        if(project) dispatch(removeUserFromTeam({projectId: project.id, removeUserId: id}))
    }
    const changeAdminCallback: ChangeAdminCallbackType = (id: string): void => {
        if(project) dispatch(changeProjectAdministrator({projectId: project.id, newAdministrator: id}))
    }
    const changeRoleCallback:ChangeRoleCallbackType = (id: string, role: string): void => {
        if(project) dispatch(changeRoleUser({ projectId: project.id, teamMember: id, role}))
    }
    const leaveCallback:LeaveCallbackType = (id: string): void => {
        if(project) dispatch(leaveProject({ projectId: project.id, leaveUserId: id}))
    }

    return (
        <div className={classes.container} {...rest}>

            {team && user && project &&
                team.map(teamUser => {
                    return(
                        <TeamUser
                            key={teamUser.user.id}
                            user={teamUser.user}
                            currentUser={user}
                            role={teamUser.role}
                            isAdmin={project.administrator === teamUser.user.id}
                            showButtons={project.administrator === user.id}
                            deleteCallback={deleteCallback}
                            changeAdminCallback={changeAdminCallback}
                            changeRoleCallback={changeRoleCallback}
                            leaveCallback={leaveCallback}
                        />
                    )
                })
            }

        </div>
    );
};

export default TeamList;