import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {InstagramPublicationType} from "../types/PostType";
import {FileType, PhotoType} from "../types/FileType";
import {publishInstagramPublication, getInstagramPublication, updateInstagramPublication} from "../thunks/PostThunks";

interface InstagramPublicationState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    isEdit: boolean;
    publication: InstagramPublicationType | null,
    selectMedia: (FileType | PhotoType)[];
}

const clearPublication: InstagramPublicationType = {
    id: '',
    project: '',
    status: 'unpublish',
    author: '',
    dateCreated: new Date().toISOString(),
    datePublish: new Date().toISOString(),
    social: 'instagram',
    typePost: 'publication',
    params: {
        media: [],
        description: '',
        aspectRatio: '1/1'
    }
}

const initialState: InstagramPublicationState = {
    isLoading: false,
    error: null,
    isEdit: false,
    publication: null,
    selectMedia: []
}

interface SetClearPublicationType {
    project: string;
    author: string;
}

const instagramPublicationSlice = createSlice({
    name: "instagramPublication",
    initialState,
    reducers: {
        setPublication: (state, action: PayloadAction<InstagramPublicationType | null>) => {
            state.publication = action.payload;
        },
        setClearPublication: (state, action: PayloadAction<SetClearPublicationType>) => {
            state.publication = {...clearPublication, project: action.payload.project, author: action.payload.author};
        },
        setEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setSelectMedia: (state, action: PayloadAction<(FileType | PhotoType)[]>) => {
            state.selectMedia = action.payload;

            if(state.publication) {
                state.publication = {
                    ...state.publication,
                    params: {
                        ...state.publication.params,
                        media: action.payload.map(item => item.id),
                    }
                };
            }
        },
        resetPublication: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isEdit = false;
            state.publication = null;
            state.selectMedia = [];
        },
    },
    extraReducers: {
        /* getInstagramPublication */
        [getInstagramPublication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getInstagramPublication.fulfilled.type]: (state, action: PayloadAction<InstagramPublicationType>) => {
            state.isLoading = false;
            state.error = null;
            state.publication = action.payload;
        },
        [getInstagramPublication.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* publishInstagramPublication */
        [publishInstagramPublication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [publishInstagramPublication.fulfilled.type]: (state, action: PayloadAction<InstagramPublicationType>) => {
            state.isLoading = false;
            state.error = null;
            state.publication = action.payload;
        },
        [publishInstagramPublication.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        /* updateInstagramPublication */
        [updateInstagramPublication.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateInstagramPublication.fulfilled.type]: (state, action: PayloadAction<InstagramPublicationType>) => {
            state.isLoading = false;
            state.error = null;
            state.publication = action.payload;
        },
        [updateInstagramPublication.rejected.type]: (state, action: PayloadAction<ErrorResponseType>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default instagramPublicationSlice.reducer;
export const {
    setPublication,
    setClearPublication,
    setEdit,
    setSelectMedia,
    resetPublication
} = instagramPublicationSlice.actions;