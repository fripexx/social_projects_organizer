import instanceServer from "../instanceServer";
import {AxiosRequestConfig, isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {InstagramPublicationType, PostType} from "../../store/types/PostType";
import {
    GetInstagramPublicationRequestType,
    GetPostsRequestType,
    GetPostsResponseType,
} from "../types/PostServiceTypes";

class PostService {
    async publishInstagramPublication(data: InstagramPublicationType): Promise<InstagramPublicationType> {
        try {
            const response = await instanceServer.post<InstagramPublicationType>('/create-instagram-publication', data);

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

    async getInstagramPublication(data: GetInstagramPublicationRequestType): Promise<InstagramPublicationType> {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.get<InstagramPublicationType>('/get-instagram-publication', config);

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

    async updateInstagramPublication(data: InstagramPublicationType): Promise<InstagramPublicationType> {
        try {
            const response = await instanceServer.patch<InstagramPublicationType>('/update-instagram-publication', data);

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

    async deletePost(id: string | string[]) {
        try {
            const config: AxiosRequestConfig = {params: {id}}
            const response = await instanceServer.delete<string | string[]>('/delete-post', config);

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

    async sendForConfirmation(id: string) {
        try {
            const response = await instanceServer.patch<PostType>('/send-for-confirmation', {id});

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

    async getPosts(data: GetPostsRequestType ) {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.get<GetPostsResponseType>('/get-posts', config);

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

export default new PostService();