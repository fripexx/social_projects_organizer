import {createAsyncThunk} from "@reduxjs/toolkit";
import ProjectService from "../../api/services/ProjectService";
import {ProjectType} from "../types/ProjectType";
import {AsyncThunkConfig} from "./types/AsyncThunkConfig";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {NoteType} from "../types/NoteType";
import {BasicUserInfo} from "../types/UserType";
import {BasicTeamMemberType} from "../types/TeamMemberType";
import {
    AddNoteInProjectRequestType,
    AddUserInTeamRequestType,
    ChangeNoteDataRequestType,
    ChangeProjectAdminRequestType,
    ChangeRoleUserRequestType,
    DeleteNoteInProjectRequestType,
    LeaveProjectRequestType,
    RemoveUserFromTeamRequestType
} from "../../api/types/ProjectServiceTypes";
import {ProjectDocument} from "../types/ProjectDocument";

export const getProject = createAsyncThunk<ProjectType, string, AsyncThunkConfig>(
    'project/getProject',
    async (id, thunkAPI) => {
        try {
            return await ProjectService.getProject(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const editSettingsProject = createAsyncThunk<ProjectType, FormData, AsyncThunkConfig>(
    'project/editSettingsProject',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.editSettingsProject(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);


/**
 * NOTES THUNKS
 */

export const getNotesProject = createAsyncThunk<NoteType[], string, AsyncThunkConfig>(
    'project/getNotesProject',
    async (id, thunkAPI) => {
        try {
            return await ProjectService.getNotesProject(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const addNoteInProject = createAsyncThunk<NoteType, AddNoteInProjectRequestType, AsyncThunkConfig>(
    'project/addNoteInProject',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.addNoteInProject(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const deleteNoteInProject = createAsyncThunk<NoteType, DeleteNoteInProjectRequestType, AsyncThunkConfig>(
    'project/deleteNoteInProject',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.deleteNoteInProject(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const changeNoteInProject = createAsyncThunk<NoteType, ChangeNoteDataRequestType, AsyncThunkConfig>(
    'project/changeNoteInProject',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.changeNoteInProject(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);


/**
 * TEAM THUNKS
 */

export const getProjectTeam = createAsyncThunk<BasicUserInfo[], string, AsyncThunkConfig>(
    'project/getProjectTeam',
    async (projectId, thunkAPI) => {
        try {
            return await ProjectService.getProjectTeam(projectId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const changeProjectAdministrator = createAsyncThunk<void, ChangeProjectAdminRequestType, AsyncThunkConfig>(
    'project/changeProjectAdministrator',
    async (data, thunkAPI) => {
        try {
            await ProjectService.changeProjectAdministrator(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const changeRoleUser = createAsyncThunk<BasicTeamMemberType[], ChangeRoleUserRequestType, AsyncThunkConfig>(
    'project/changeRoleUser',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.changeRoleUserRequest(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error as ErrorResponseType);
        }
    }
);

export const leaveProject = createAsyncThunk<BasicTeamMemberType[], LeaveProjectRequestType, AsyncThunkConfig>(
    'project/leaveProject',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.leaveProject(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const removeUserFromTeam = createAsyncThunk<BasicTeamMemberType[], RemoveUserFromTeamRequestType, AsyncThunkConfig>(
    'project/removeUserFromTeam',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.removeUserFromTeam(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const addUserInTeam = createAsyncThunk<BasicTeamMemberType[], AddUserInTeamRequestType, AsyncThunkConfig>(
    'project/addUserInTeam',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.addUserInTeam(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);


/**
 * DOCUMENTS THUNKS
 */

export const getDocuments = createAsyncThunk<ProjectDocument[], string, AsyncThunkConfig>(
    'project/getDocuments',
    async (projectId, thunkAPI) => {
        try {
            return await ProjectService.getDocuments(projectId);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const setDocument = createAsyncThunk<ProjectDocument, FormData, AsyncThunkConfig>(
    'project/setDocument',
    async (data, thunkAPI) => {
        try {
            return await ProjectService.setDocument(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);

export const deleteDocument = createAsyncThunk<string, string, AsyncThunkConfig>(
    'project/deleteDocument',
    async (id, thunkAPI) => {
        try {
            return await ProjectService.deleteDocument(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);
