import {createAsyncThunk} from "@reduxjs/toolkit";
import instanceServer from "../../api/instanceServer";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {isAxiosError} from "axios";
import {MessageType} from "../types/MessageType";

interface SendMessageProps {
    chat: string,
    model: "Project" | "Post",
    content: string,
    files: File[]
}

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (data: FormData, thunkAPI) => {
        try {
            const response = await instanceServer.post<MessageType>(
                `/send-message`,
                data
            );
            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: "Непередбачена помилка"
            }

            if (isAxiosError(e) && e?.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }
            return thunkAPI.rejectWithValue(response);
        }
    }
);