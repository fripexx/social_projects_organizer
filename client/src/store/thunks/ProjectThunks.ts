import {createAsyncThunk} from "@reduxjs/toolkit";
import instanceServer from "../../api/instanceServer";
import {ProjectType} from "../types/ProjectType";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {isAxiosError} from "axios";
import {NoteType} from "../types/NoteType";
import {BasicUserInfo} from "../types/UserType";
import {TeamMemberType} from "../types/TeamMemberType";

export const getProject = createAsyncThunk(
    'project/getProject',
    async (id: string, thunkAPI) => {
        try {
            const response = await instanceServer.get<ProjectType>(
                `/get-project`,
                {
                    params: {id}
                }
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);
export const editSettingsProject = createAsyncThunk(
    'project/editSettingsProject',
    async (data: FormData, thunkAPI) => {
        try {
            const response = await instanceServer.put<ProjectType>(
                `/edit-settings-project`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

/*
* NOTES
*/

export const getNotesProject = createAsyncThunk(
    'project/getNotesProject',
    async (id: string, thunkAPI) => {
        try {
            const response = await instanceServer.get<NoteType[]>(
                `/get-notes-project`,
                {
                    params: {id}
                },
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface AddNoteData {
    text: string;
    idProject: string;
}

export const addNoteInProject = createAsyncThunk(
    'project/addNoteInProject',
    async (data: AddNoteData, thunkAPI) => {
        try {
            const response = await instanceServer.post<NoteType>(
                `/add-note-in-project`,
                data,
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface deleteNoteData {
    idNote: string;
    idProject: string;
}
export const deleteNoteInProject = createAsyncThunk(
    'project/deleteNoteInProject',
    async (data: deleteNoteData, thunkAPI) => {
        try {
            const response = await instanceServer.delete<NoteType>(
                `/delete-note-in-project`,
                { params: data },
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface changeNoteData extends deleteNoteData{
    text: string;
}
export const changeNoteInProject = createAsyncThunk(
    'project/changeNoteInProject',
    async (data: changeNoteData, thunkAPI) => {
        try {
            const response = await instanceServer.patch<NoteType>(
                `/change-note-in-project`,
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

export const getProjectTeam = createAsyncThunk(
    'project/getProjectTeam',
    async (projectId: string, thunkAPI) => {
        try {
            const response = await instanceServer.get<BasicUserInfo[]>(
                `/get-project-team`,
                {params: {projectId}}
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface changeAdministratorType {
    projectId: string;
    newAdministrator: string;
}
export const changeProjectAdministrator = createAsyncThunk(
    'project/changeProjectAdministrator',
    async (data: changeAdministratorType, thunkAPI) => {
        try {
            const response = await instanceServer.patch<Response>(
                `/change-project-administrator`,
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface changeRoleType {
    projectId: string;
    teamMember: string;
    role: string;
}
export const changeRoleUser = createAsyncThunk(
    'project/changeRoleUser',
    async (data: changeRoleType, thunkAPI) => {
        try {
            const response = await instanceServer.patch<TeamMemberType>(
                `/change-role-user`,
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface leaveProjectType {
    projectId: string;
    leaveUserId: string;
}
export const leaveProject = createAsyncThunk(
    'project/leaveProject',
    async (data: leaveProjectType, thunkAPI) => {
        try {
            const response = await instanceServer.patch<TeamMemberType>(
                `/leave-project`,
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface removeUserFromTeamType {
    projectId: string;
    removeUserId: string;
}
export const removeUserFromTeam = createAsyncThunk(
    'project/removeUserFromTeam',
    async (data: removeUserFromTeamType, thunkAPI) => {
        try {
            const response = await instanceServer.patch<TeamMemberType[]>(
                `/remove-user-from-team`,
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);

interface addUserInTeamType {
    projectId: string;
    email: string;
    role: string;
}
export const addUserInTeam = createAsyncThunk(
    'project/addUserInTeam',
    async (data: addUserInTeamType, thunkAPI) => {
        try {
            const response = await instanceServer.patch<TeamMemberType[]>(
                `/add-user-in-team`,
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);