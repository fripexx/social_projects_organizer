import {createAsyncThunk} from "@reduxjs/toolkit";
import instanceServer from "../../axios/instanceServer";
import {ProjectType} from "../types/ProjectType";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {isAxiosError} from "axios";

export const getProject = createAsyncThunk(
    'project/getProject',
    async (id: string, thunkAPI) => {
        try {
            const response = await instanceServer.get<ProjectType>(
                `/get-project`,
                {
                    params: {id}
                }
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