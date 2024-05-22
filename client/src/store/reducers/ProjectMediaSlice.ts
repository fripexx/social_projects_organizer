import {ErrorResponseType} from "../types/ErrorResponseType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMedia, uploadMedia, deleteMedia} from "../thunks/ProjectMediaThunks";
import {FileType, PhotoType} from "../types/FileType";
import {GetMediaResponseType} from "../types/GetMediaResponseType";

interface ProjectState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    media: (FileType | PhotoType)[];
    totalCount: number
}

const initialState: ProjectState = {
    isLoading: false,
    error: null,
    media: [],
    totalCount: 0
}

const projectMediaSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<ErrorResponseType | null>) => {
            state.error = action.payload;
        },
        setMedia: (state, action: PayloadAction<(FileType | PhotoType)[]>) => {
            state.media = action.payload;
        },
    },
    extraReducers: {
        [getMedia.pending.type]: (state) => {},
        [getMedia.fulfilled.type]: (state, action: PayloadAction<GetMediaResponseType>) => {
            state.error = null;
            state.totalCount = action.payload.total;
            state.media = [...state.media, ...action.payload.media]
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

export default projectMediaSlice.reducer;
export const { setError, setMedia } = projectMediaSlice.actions;