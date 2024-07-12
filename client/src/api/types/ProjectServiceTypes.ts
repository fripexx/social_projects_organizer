export interface AddNoteInProjectRequestType {
    text: string;
    idProject: string;
}

export interface DeleteNoteInProjectRequestType {
    idNote: string;
    idProject: string;
}

export interface ChangeNoteDataRequestType {
    idNote: string;
    idProject: string;
    text: string;
}

export interface ChangeProjectAdminRequestType {
    projectId: string;
    newAdministrator: string;
}

export interface ChangeRoleUserRequestType {
    projectId: string;
    teamMember: string;
    role: string;
}

export interface LeaveProjectRequestType {
    projectId: string;
    leaveUserId: string;
}

export interface RemoveUserFromTeamRequestType {
    projectId: string;
    removeUserId: string;
}

export interface AddUserInTeamRequestType {
    projectId: string;
    email: string;
    role: string;
}