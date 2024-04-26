import React, {FC, useEffect, useState} from 'react';
import classes from "./TeamList.module.scss";
import TeamUser, {ChangeAdminCallbackType, DeleteCallbackType} from "../TeamUser/TeamUser";
import {BasicUserInfo} from "../../store/types/UserType";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {changeProjectAdministrator, removeUserFromTeam} from "../../store/thunks/ProjectThunks";

interface TeamListProps extends React.HTMLProps<HTMLDivElement> {
    team: BasicUserInfo[],
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

    return (
        <div className={classes.container} {...rest}>

            {team && user && project &&
                team.map(teamUser => {
                    return(
                        <TeamUser
                            key={teamUser.id}
                            user={teamUser}
                            isAdmin={project.administrator === teamUser.id}
                            showDelete={project.administrator === user.id}
                            deleteCallback={deleteCallback}
                            changeAdminCallback={changeAdminCallback}
                        />
                    )
                })
            }

        </div>
    );
};

export default TeamList;