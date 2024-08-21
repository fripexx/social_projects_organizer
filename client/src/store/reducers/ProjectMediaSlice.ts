import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMedia, uploadMedia, deleteMedia} from "../thunks/ProjectMediaThunks";
import {FileType, PhotoType} from "../types/FileType";
import {GetMediaResponseType, QueryMediaRequestType} from "../../api/types/ProjectMediaTypes";

interface ProjectState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    media: (FileType | PhotoType)[];
    query: QueryMediaRequestType | null;
    totalCount: number
}

const initialState: ProjectState = {
    isLoading: false,
    error: null,
    media: [],
    query: null,
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
        setQuery: (state, action: PayloadAction<QueryMediaRequestType | null>) => {
            state.query = action.payload;
        },
    },
    extraReducers: {
        /* getMedia */
        [getMedia.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getMedia.fulfilled.type]: (state, action: PayloadAction<GetMediaResponseType>) => {
            state.isLoading = false;
            state.error = null;
            state.totalCount = action.payload.total;
            state.media = action.payload.media
        },
        [getMedia.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* uploadMedia */
        [uploadMedia.pending.type]: (state) => {
            state.isLoading = true;
        },
        [uploadMedia.fulfilled.type]: (state, action: PayloadAction<(FileType | PhotoType)[]>) => {
            state.isLoading = false;
            state.error = null;
            state.media = [...state.media, ...action.payload]
        },
        [uploadMedia.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* deleteMedia */
        [deleteMedia.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteMedia.fulfilled.type]: (state, action: PayloadAction<FileType | PhotoType>) => {
            state.isLoading = false;
            state.error = null;
            state.media = [...state.media].filter(item => item.id !== action.payload.id)
        },
        [deleteMedia.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default projectMediaSlice.reducer;
export const {
    setError,
    setMedia,
    setQuery
} = projectMediaSlice.actions;