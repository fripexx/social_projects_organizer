import {ErrorResponseType} from "../types/ErrorResponseType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectType} from "../types/ProjectType";
import {
    editSettingsProject,
    getProject,
    getNotesProject,
    addNoteInProject,
    deleteNoteInProject, changeNoteInProject, getProjectTeam, removeUserFromTeam, addUserInTeam, getMedia, uploadMedia, deleteMedia
} from "../thunks/ProjectThunks";
import {NoteType} from "../types/NoteType";
import {BasicUserInfo} from "../types/UserType";
import {FileType, PhotoType} from "../types/FileType";

interface ProjectState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    project: ProjectType | null;
    projectId: string | null,
    notes: NoteType[],
    team: BasicUserInfo[],
    media: (FileType | PhotoType)[];
}

const initialState: ProjectState = {
    isLoading: false,
    error: null,
    project: null,
    projectId: null,
    notes: [],
    team: [],
    media: []
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<ProjectType | null>) => {
            state.project = action.payload;
        },
        setError: (state, action: PayloadAction<ErrorResponseType | null>) => {
            state.error = action.payload;
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
        [addNoteInProject.pending.type]: (state) => {},
        [addNoteInProject.fulfilled.type]: (state, action: PayloadAction<NoteType>) => {
            state.error = null;
            state.notes = [...state.notes, action.payload]
        },
        [addNoteInProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.notes = [];
        },
        [deleteNoteInProject.pending.type]: (state) => {},
        [deleteNoteInProject.fulfilled.type]: (state, action: PayloadAction<NoteType>) => {
            state.error = null;
            state.notes = [...state.notes].filter(note => note.id != action.payload.id);
        },
        [deleteNoteInProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.notes = [];
        },
        [changeNoteInProject.pending.type]: (state) => {},
        [changeNoteInProject.fulfilled.type]: (state, action: PayloadAction<NoteType>) => {
            state.error = null;
            state.notes = state.notes.map(note => {
                if(note.id === action.payload.id) note.text = action.payload.text
                return note;
            });
        },
        [changeNoteInProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.notes = [];
        },
        [getProjectTeam.pending.type]: (state) => {},
        [getProjectTeam.fulfilled.type]: (state, action: PayloadAction<BasicUserInfo[]>) => {
            state.error = null;
            state.team = action.payload
        },
        [getProjectTeam.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.team = [];
        },
        [removeUserFromTeam.pending.type]: (state) => {},
        [removeUserFromTeam.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
            state.error = null;
            if(state.project) state.project.team = action.payload
        },
        [removeUserFromTeam.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [addUserInTeam.pending.type]: (state) => {},
        [addUserInTeam.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
            state.error = null;
            if(state.project) state.project.team = action.payload
        },
        [addUserInTeam.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getMedia.pending.type]: (state) => {},
        [getMedia.fulfilled.type]: (state, action: PayloadAction<(FileType | PhotoType)[]>) => {
            state.error = null;
            state.media = action.payload
        },
        [getMedia.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [uploadMedia.pending.type]: (state) => {},
        [uploadMedia.fulfilled.type]: (state, action: PayloadAction<(FileType | PhotoType)[]>) => {
            state.error = null;
            state.media = [...state.media, ...action.payload]
        },
        [uploadMedia.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [deleteMedia.pending.type]: (state) => {},
        [deleteMedia.fulfilled.type]: (state, action: PayloadAction<FileType | PhotoType>) => {
            state.error = null;
            state.media = [...state.media].filter(item => item.id !== action.payload.id)
        },
        [deleteMedia.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default projectSlice.reducer;
export const { setProject, setError } = projectSlice.actions;