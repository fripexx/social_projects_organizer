import {createAsyncThunk} from "@reduxjs/toolkit";
import instanceServer from "../../api/instanceServer";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {isAxiosError} from "axios";
import {InstagramPublicationType} from "../types/InstagramPostType";

export interface addInstagramPublicationType {
    project: string;
    description: string;
    aspectRatio: string;
    datePublish: Date;
    media: string[]
}

export const addInstagramPublication = createAsyncThunk(
    'instagramPosts/addInstagramPublication',
    async (data: addInstagramPublicationType, thunkAPI) => {
        try {
            const response = await instanceServer.post<InstagramPublicationType>(
                `/create-instagram-publication`,
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