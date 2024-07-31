import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramStoriesType} from "../types/PostType";
import {FileType} from "../types/FileType";
import {publishInstagramStories, getInstagramStories, updateInstagramStories} from "../thunks/PostThunks";

interface InstagramReelsState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    isEdit: boolean;
    stories: InstagramStoriesType | null,
    selectMedia: FileType | undefined;
}

const clearPublication: InstagramStoriesType = {
    id: '',
    project: '',
    status: 'unpublish',
    author: '',
    dateCreated: new Date().toISOString(),
    datePublish: new Date().toISOString(),
    social: 'instagram',
    typePost: 'stories',
    params: {
        media: '',
    }
}

const initialState: InstagramReelsState = {
    isLoading: false,
    error: null,
    isEdit: false,
    stories: null,
    selectMedia: undefined
}

interface SetClearPublicationType {
    project: string;
    author: string;
}

const instagramStoriesSlice = createSlice({
    name: "instagramStories",
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<InstagramStoriesType | null>) => {
            state.stories = action.payload;
        },
        setClearPost: (state, action: PayloadAction<SetClearPublicationType>) => {
            state.stories = {...clearPublication, project: action.payload.project, author: action.payload.author};
        },
        setEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setSelectMedia: (state, action: PayloadAction<FileType | undefined>) => {
            state.selectMedia = action.payload;

            if(state.stories) {
                state.stories = {
                    ...state.stories,
                    params: {
                        ...state.stories.params,
                        media: action.payload === undefined ? '' : action.payload.id
                    }
                };
            }
        },
        resetPublication: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isEdit = false;
            state.stories = null;
            state.selectMedia = undefined;
        },
    },
    extraReducers: {
        /* getInstagramReels */
        [getInstagramStories.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getInstagramStories.fulfilled.type]: (state, action: PayloadAction<InstagramStoriesType>) => {
            state.isLoading = false;
            state.error = null;
            state.stories = action.payload;
        },
        [getInstagramStories.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* publishInstagramReels */
        [publishInstagramStories.pending.type]: (state) => {
            state.isLoading = true;
        },
        [publishInstagramStories.fulfilled.type]: (state, action: PayloadAction<InstagramStoriesType>) => {
            state.isLoading = false;
            state.error = null;
            state.stories = action.payload;
        },
        [publishInstagramStories.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* updateInstagramReels */
        [updateInstagramStories.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateInstagramStories.fulfilled.type]: (state, action: PayloadAction<InstagramStoriesType>) => {
            state.isLoading = false;
            state.error = null;
            state.stories = action.payload;
        },
        [updateInstagramStories.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default instagramStoriesSlice.reducer;
export const {
    setPost,
    setClearPost,
    setEdit,
    setSelectMedia,
    resetPublication
} = instagramStoriesSlice.actions;