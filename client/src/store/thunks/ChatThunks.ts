import {createAsyncThunk} from "@reduxjs/toolkit";
import ChatService from "../../api/services/ChatService";
import {AsyncThunkConfig} from "./types/AsyncThunkConfig";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {MessageType} from "../types/MessageType";

export const sendMessage = createAsyncThunk<MessageType, FormData, AsyncThunkConfig>(
    'chat/sendMessage',
    async (data, thunkAPI) => {
        try {
            return await ChatService.sendMessage(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);