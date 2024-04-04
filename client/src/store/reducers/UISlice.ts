import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UIState {
    showMobileSidebar: boolean,
}

const initialState: UIState = {
    showMobileSidebar: false,
}

const UISlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        showSidebar: (state, action: PayloadAction<boolean>) => {
            state.showMobileSidebar = action.payload;
        },
    },
    extraReducers: {}
})

export default UISlice.reducer;
export const { showSidebar } = UISlice.actions;