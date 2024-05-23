import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UIState {
    showMobileSidebar: boolean,
    showGeneralChat: boolean,
}

const initialState: UIState = {
    showMobileSidebar: false,
    showGeneralChat: false
}

const UISlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        showSidebar: (state, action: PayloadAction<boolean>) => {
            state.showMobileSidebar = action.payload;
        },
        showChat: (state, action: PayloadAction<boolean>) => {
            state.showGeneralChat = action.payload;
        },
    },
    extraReducers: {}
})

export default UISlice.reducer;
export const { showSidebar, showChat } = UISlice.actions;