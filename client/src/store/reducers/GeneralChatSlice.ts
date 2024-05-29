import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatType, MessageType} from "../types/ChatTypes";
import {ErrorResponseType} from "../types/ErrorResponseType";

interface GeneralChatState {
    chat: ChatType | null,
    messages: MessageType[],
    loading: boolean,
    error: ErrorResponseType | null,
    showGeneralChat: boolean,
}

const initialState: GeneralChatState = {
    chat: null,
    messages: [],
    loading: false,
    error: null,
    showGeneralChat: false
}

const GeneralChatSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        showChat: (state, action: PayloadAction<boolean>) => {
            state.showGeneralChat = action.payload;
        },
    },
    extraReducers: {}
})

export default GeneralChatSlice.reducer;
export const { showChat } = GeneralChatSlice.actions;