import instanceServer from "../instanceServer";
import {AxiosRequestConfig, isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {InstagramPublicationType, InstagramReelsType, InstagramStoriesType, PostType} from "../../store/types/PostType";
import {GetPostRequestType, GetPostsResponseType} from "../types/PostServiceTypes";
import {PostsQueryType} from "../../store/types/PostsQueryType";

class PostService {

    /**
     * Instagram Publication
     */

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

    async getInstagramPublication(data: GetPostRequestType): Promise<InstagramPublicationType> {
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


    /**
     * Instagram Reels
     */

    async publishInstagramReels(data: InstagramReelsType): Promise<InstagramReelsType> {
        try {
            const response = await instanceServer.post<InstagramReelsType>('/create-instagram-reels', data);

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

    async getInstagramReels(data: GetPostRequestType): Promise<InstagramReelsType> {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.get<InstagramReelsType>('/get-instagram-reels', config);

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

    async updateInstagramReels(data: InstagramReelsType): Promise<InstagramReelsType> {
        try {
            const response = await instanceServer.patch<InstagramReelsType>('/update-instagram-reels', data);

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


    /**
     * Instagram Stories
     */

    async publishInstagramStories(data: InstagramStoriesType): Promise<InstagramStoriesType> {
        try {
            const response = await instanceServer.post<InstagramStoriesType>('/create-instagram-stories', data);

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

    async getInstagramStories(data: GetPostRequestType): Promise<InstagramStoriesType> {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.get<InstagramStoriesType>('/get-instagram-stories', config);

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

    async updateInstagramStories(data: InstagramStoriesType): Promise<InstagramStoriesType> {
        try {
            const response = await instanceServer.patch<InstagramStoriesType>('/update-instagram-stories', data);

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


    /**
     * General
     */

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

    async rejectPost(id: string) {
        try {
            const response = await instanceServer.patch<PostType>('/reject-post', {id});

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

    async confirmPost(id: string) {
        try {
            const response = await instanceServer.patch<PostType>('/confirm-post', {id});

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

    async getPosts(data: PostsQueryType) {
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