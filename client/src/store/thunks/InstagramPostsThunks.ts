import {createAsyncThunk} from "@reduxjs/toolkit";
import instanceServer from "../../api/instanceServer";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {isAxiosError} from "axios";
import {InstagramPostType} from "../types/InstagramPostType";

export const addInstagramPost = createAsyncThunk(
    'instagramPosts/addInstagramPost',
    async (data: FormData, thunkAPI) => {
        try {
            const response = await instanceServer.post<InstagramPostType>(
                `/add-instagram-post`,
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