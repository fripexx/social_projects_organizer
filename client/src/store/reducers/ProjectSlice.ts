import {ErrorResponseType} from "../types/ErrorResponseType";
import {createSlice} from "@reduxjs/toolkit";

interface ProjectState {
    isLoading: boolean,
    error: ErrorResponseType | null;
    project: null;
}

const initialState: ProjectState = {
    isLoading: false,
    error: null,
    project: null
}

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: {

    }
})

export default projectSlice.reducer;
