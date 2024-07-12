import {createAsyncThunk} from "@reduxjs/toolkit";
import ChatService from "../../api/services/ChatService";
import {ErrorResponseType} from "../../api/types/ErrorResponseType";
import {MessageType} from "../types/MessageType";

export const sendMessage = createAsyncThunk<MessageType, FormData, { rejectValue: ErrorResponseType }>(
    'chat/sendMessage',
    async (data, thunkAPI) => {
        try {
            return await ChatService.sendMessage(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e as ErrorResponseType);
        }
    }
);
