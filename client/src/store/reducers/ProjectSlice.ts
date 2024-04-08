import {ErrorResponseType} from "../types/ErrorResponseType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectType} from "../types/ProjectType";
import {editSettingsProject, getProject, getNotesProject} from "../thunks/ProjectThunks";
import {NoteType} from "../types/NoteType";

interface ProjectState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    project: ProjectType | null;
    projectId: string | null,
    notes: NoteType[]
}

const initialState: ProjectState = {
    isLoading: false,
    error: null,
    project: null,
    projectId: null,
    notes: [],
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<ProjectType | null>) => {
            state.project = action.payload;
        },
    },
    extraReducers: {
        [getProject.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getProject.fulfilled.type]: (state, action: PayloadAction<ProjectType>) => {
            state.isLoading = false;
            state.error = null;
            state.project = action.payload;
            state.projectId = action.payload.id;
        },
        [getProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.project = null;
            state.projectId = null;
        },
        [editSettingsProject.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editSettingsProject.fulfilled.type]: (state, action: PayloadAction<ProjectType>) => {
            state.isLoading = false;
            state.error = null;
            state.project = action.payload;
            state.projectId = action.payload.id;
        },
        [editSettingsProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getNotesProject.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getNotesProject.fulfilled.type]: (state, action: PayloadAction<NoteType[]>) => {
            state.isLoading = false;
            state.error = null;
            state.notes = action.payload;
        },
        [getNotesProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.notes = [];
        },
    }
})

export default projectSlice.reducer;
export const { setProject } = projectSlice.actions;