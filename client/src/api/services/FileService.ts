import instanceServer from "../instanceServer";
import {AxiosRequestConfig, isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";

class FileService {
    async getFile(path: string): Promise<Blob> {
        try {
            const config: AxiosRequestConfig = {responseType: "blob"}
            const response = await instanceServer.get<Blob>(path, config);

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

export default new FileService();