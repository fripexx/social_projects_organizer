import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramReelsType} from "../types/PostType";
import {FileType} from "../types/FileType";
import {publishInstagramReels, getInstagramReels, updateInstagramReels} from "../thunks/PostThunks";

interface InstagramReelsState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    isEdit: boolean;
    reels: InstagramReelsType | null,
    selectMedia: FileType | undefined;
}

const clearPublication: InstagramReelsType = {
    id: '',
    project: '',
    status: 'unpublish',
    author: '',
    dateCreated: new Date().toISOString(),
    datePublish: new Date().toISOString(),
    social: 'instagram',
    typePost: 'reels',
    params: {
        media: '',
        description: '',
        musicTrack: ''
    }
}

const initialState: InstagramReelsState = {
    isLoading: false,
    error: null,
    isEdit: false,
    reels: null,
    selectMedia: undefined
}

interface SetClearPublicationType {
    project: string;
    author: string;
}

const instagramReelsSlice = createSlice({
    name: "instagramReels",
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<InstagramReelsType | null>) => {
            state.reels = action.payload;
        },
        setClearPost: (state, action: PayloadAction<SetClearPublicationType>) => {
            state.reels = {...clearPublication, project: action.payload.project, author: action.payload.author};
        },
        setEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setSelectMedia: (state, action: PayloadAction<FileType | undefined>) => {
            state.selectMedia = action.payload;

            if(state.reels) {
                state.reels = {
                    ...state.reels,
                    params: {
                        ...state.reels.params,
                        media: action.payload === undefined ? '' : action.payload.id
                    }
                };
            }
        },
        resetPost: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isEdit = false;
            state.reels = null;
            state.selectMedia = undefined;
        },
    },
    extraReducers: {
        /* getInstagramReels */
        [getInstagramReels.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getInstagramReels.fulfilled.type]: (state, action: PayloadAction<InstagramReelsType>) => {
            state.isLoading = false;
            state.error = null;
            state.reels = action.payload;
        },
        [getInstagramReels.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* publishInstagramReels */
        [publishInstagramReels.pending.type]: (state) => {
            state.isLoading = true;
        },
        [publishInstagramReels.fulfilled.type]: (state, action: PayloadAction<InstagramReelsType>) => {
            state.isLoading = false;
            state.error = null;
            state.reels = action.payload;
        },
        [publishInstagramReels.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* updateInstagramReels */
        [updateInstagramReels.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateInstagramReels.fulfilled.type]: (state, action: PayloadAction<InstagramReelsType>) => {
            state.isLoading = false;
            state.error = null;
            state.reels = action.payload;
        },
        [updateInstagramReels.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default instagramReelsSlice.reducer;
export const {
    setPost,
    setClearPost,
    setEdit,
    setSelectMedia,
    resetPost
} = instagramReelsSlice.actions;