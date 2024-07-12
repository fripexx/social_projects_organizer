import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../types/UserType";
import {LoginResponseType} from "../../api/types/UserServiceTypes";
import {
    addNoteUser, addProject,
    changeNoteUser,
    checkAuth, deleteNoteUser,
    editSettingsUser,
    editUser, getNotesUser, getProjects,
    login,
    logout,
    registration,
    sendActivateLink
} from "../thunks/UserThunks";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {NoteType} from "../types/NoteType";
import {ProjectType} from "../types/ProjectType";


interface UserState {
    user: UserType | null;
    isLoading: boolean;
    isAuth: boolean;
    error: ErrorResponseType | null;
    shouldRedirectToProjectsPage: boolean;
    shouldRedirectToLoginPage: boolean;
    notes: NoteType[];
    projects: ProjectType[];
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    isAuth: false,
    error: null,
    shouldRedirectToProjectsPage: false,
    shouldRedirectToLoginPage: false,
    notes: [],
    projects: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        /* Login */
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
            state.isAuth = true;
            state.shouldRedirectToProjectsPage = true;
        },
        [login.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Registration */
        [registration.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registration.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            //state.user = action.payload;
            state.isAuth = true;
            state.shouldRedirectToLoginPage = true;
        },
        [registration.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Logout */
        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.fulfilled.type]: (state, action: PayloadAction<LoginResponseType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = null;
            state.isAuth = false
            state.shouldRedirectToProjectsPage = false;
            state.shouldRedirectToLoginPage = false;
        },
        [logout.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Check Auth */
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
            state.isAuth = true;
        },
        [checkAuth.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('token');
            state.error = action.payload;
        },

        /* Check Auth */
        [sendActivateLink.pending.type]: (state) => {
            state.isLoading = true;
        },
        [sendActivateLink.fulfilled.type]: (state, action: PayloadAction) => {
            state.isLoading = false;
            state.error = null;
        },
        [sendActivateLink.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Edit User */
        [editUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editUser.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
        },
        [editUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Edit Settings User */
        [editSettingsUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [editSettingsUser.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
        },
        [editSettingsUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Add note user */
        [addNoteUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addNoteUser.fulfilled.type]: (state, action: PayloadAction<NoteType>) => {
            state.isLoading = false;
            state.error = null;
            state.notes = [...state.notes, action.payload]
        },
        [addNoteUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Delete note user */
        [deleteNoteUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteNoteUser.fulfilled.type]: (state, action: PayloadAction<NoteType>) => {
            state.isLoading = false;
            state.error = null;
            state.notes = [...state.notes].filter(note => note.id != action.payload.id);
        },
        [deleteNoteUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Get all note user */
        [getNotesUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getNotesUser.fulfilled.type]: (state, action: PayloadAction<NoteType[]>) => {
            state.isLoading = false;
            state.error = null;
            state.notes = action.payload;
        },
        [getNotesUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Change note user */
        [changeNoteUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [changeNoteUser.fulfilled.type]: (state, action: PayloadAction<NoteType>) => {
            state.isLoading = false;
            state.error = null;
            state.notes = state.notes.map(note => {
                if(note.id === action.payload.id) note.text = action.payload.text
                return note;
            });
        },
        [changeNoteUser.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Add project */
        [addProject.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addProject.fulfilled.type]: (state, action: PayloadAction<ProjectType>) => {
            state.isLoading = false;
            state.error = null;
            state.projects = [...state.projects, action.payload];
        },
        [addProject.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* Get projects */
        [getProjects.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getProjects.fulfilled.type]: (state, action: PayloadAction<ProjectType[]>) => {
            state.isLoading = false;
            state.error = null;
            state.projects = action.payload;
        },
        [getProjects.rejected.type]: (state,  action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default userSlice.reducer;
