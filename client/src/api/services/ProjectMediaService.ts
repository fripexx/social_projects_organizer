import instanceServer from "../instanceServer";
import {AxiosRequestConfig, isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {FileType, PhotoType} from "../../store/types/FileType";
import {
    DeleteMediaRequestType,
    QueryMediaRequestType,
    GetMediaResponseType,
    GetMediaRequestType
} from "../types/ProjectMediaTypes";

class ProjectMediaService {
    async uploadMedia(data: FormData): Promise<(FileType | PhotoType)[]> {
        try {
            const response = await instanceServer.post<(FileType | PhotoType)[]>('/upload-media', data);

            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: 'Непередбачена помилка',
            };

            if (isAxiosError(e) && e.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            throw response;
        }
    }

    async getMedia(data: QueryMediaRequestType): Promise<GetMediaResponseType> {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.get<GetMediaResponseType>('/get-media', config);

            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: 'Непередбачена помилка',
            };

            if (isAxiosError(e) && e.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            throw response;
        }
    }

    async getMediaOne(data: GetMediaRequestType): Promise<FileType | PhotoType> {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.get<FileType | PhotoType>('/get-media-one', config);

            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: 'Непередбачена помилка',
            };

            if (isAxiosError(e) && e.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            throw response;
        }
    }

    async deleteMedia(data: DeleteMediaRequestType): Promise<FileType | PhotoType> {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.delete<FileType | PhotoType>('/delete-media', config);

            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: 'Непередбачена помилка',
            };

            if (isAxiosError(e) && e.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            throw response;
        }
    }
}

export default new ProjectMediaService();