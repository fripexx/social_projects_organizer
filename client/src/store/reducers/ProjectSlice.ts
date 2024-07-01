import {ErrorResponseType} from "../types/ErrorResponseType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectType} from "../types/ProjectType";
import {
    editSettingsProject,
    getProject,
    getNotesProject,
    addNoteInProject,
    deleteNoteInProject,
    changeNoteInProject,
    getProjectTeam,
    removeUserFromTeam,
    addUserInTeam,
    changeRoleUser,
    leaveProject,
} from "../thunks/ProjectThunks";
import {NoteType} from "../types/NoteType";
import {TeamMemberType} from "../types/TeamMemberType";

interface ProjectState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    project: ProjectType | null;
    projectId: string | null,
    notes: NoteType[],
    team: TeamMemberType[],
}

const initialState: ProjectState = {
    isLoading: false,
    error: null,
    project: null,
    projectId: null,
    notes: [],
    team: [],
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
        }
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
            state.notes = [...state.notes].filter(note => note.id !== action.payload.id);
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

        /*
         * Project Team
         *
         *
         */
        [getProjectTeam.pending.type]: (state) => {},
        [getProjectTeam.fulfilled.type]: (state, action: PayloadAction<TeamMemberType[]>) => {
            state.error = null;
            state.team = action.payload
        },
        [getProjectTeam.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.team = [];
        },
        [removeUserFromTeam.pending.type]: (state) => {},
        [removeUserFromTeam.fulfilled.type]: (state, action: PayloadAction<TeamMemberType[]>) => {
            state.error = null;
            if (state.project) state.project.team = action.payload;
        },
        [removeUserFromTeam.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [addUserInTeam.pending.type]: (state) => {},
        [addUserInTeam.fulfilled.type]: (state, action: PayloadAction<TeamMemberType[]>) => {
            state.error = null;
            if(state.project) state.project.team = [...action.payload]
        },
        [addUserInTeam.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [changeRoleUser.pending.type]: (state) => {},
        [changeRoleUser.fulfilled.type]: (state, action: PayloadAction<TeamMemberType[]>) => {
            state.error = null;
            if(state.project) state.project.team = action.payload
        },
        [changeRoleUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [leaveProject.pending.type]: (state) => {},
        [leaveProject.fulfilled.type]: (state, action: PayloadAction<TeamMemberType[]>) => {
            state.error = null;
            if(state.project) state.project.team = action.payload
        },
        [leaveProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default projectSlice.reducer;
export const { setProject, setError } = projectSlice.actions;