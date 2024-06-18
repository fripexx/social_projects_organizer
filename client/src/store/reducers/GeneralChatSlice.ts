import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorResponseType} from "../types/ErrorResponseType";

interface GeneralChatState {
    chat: string | null,
    loading: boolean,
    error: ErrorResponseType | null,
    showGeneralChat: boolean,
    countUnreadMessages: number,
}

const initialState: GeneralChatState = {
    chat: null,
    loading: false,
    error: null,
    showGeneralChat: false,
    countUnreadMessages: 0,
}

const GeneralChatSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        showChat: (state, action: PayloadAction<boolean>) => {
            state.showGeneralChat = action.payload;
        },
        setUnreadCount: (state, action: PayloadAction<number>) => {
            state.countUnreadMessages = action.payload;
        },
    },
    extraReducers: {}
})

export default GeneralChatSlice.reducer;
export const { showChat, setUnreadCount } = GeneralChatSlice.actions;