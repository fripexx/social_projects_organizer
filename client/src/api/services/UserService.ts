import instanceServer from "../instanceServer";
import axios, {AxiosRequestConfig, isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {
    ChangeNoteRequestType,
    LoginRequestType,
    LoginResponseType,
    RegistrationRequestType,
    AddProjectRequestType,
} from "../types/UserServiceTypes";
import {SettingUser, UserType} from "../../store/types/UserType";
import {NoteType} from "../../store/types/NoteType";
import {ProjectType} from "../../store/types/ProjectType";


class UserService {
    async login(obj: LoginRequestType): Promise<LoginResponseType> {
        try {
            const response = await instanceServer.post<LoginResponseType>('/login', obj);
            localStorage.setItem('token', response.data.accessToken);

            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: 'Помилка авторизації',
            };

            if (isAxiosError(e) && e.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            throw response;
        }
    }

    async registration(obj: RegistrationRequestType): Promise<UserType> {
        try {
            const response = await instanceServer.post<UserType>('/registration', obj);

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

    async logout(): Promise<void> {
        try {
            await instanceServer.post<void>('/logout');
            localStorage.removeItem('token');
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

    async checkAuth(): Promise<LoginResponseType> {
        try {
            const config: AxiosRequestConfig = {withCredentials: true}
            const response = await axios.get<LoginResponseType>(`${process.env.REACT_APP_API_URL}/api/refresh`, config);
            localStorage.setItem('token', response.data.accessToken);

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

    async sendActivateLink(email: string): Promise<void> {
        try {
            const response = await instanceServer.post('/send-activate-link', {email});

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

    async editUser(data: FormData): Promise<UserType> {
        try {
            const config: AxiosRequestConfig = {headers: {'Content-Type': 'multipart/form-data'}}
            const response = await instanceServer.post<UserType>('/edit-user', data, config);

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

    async editSettingsUser(data: SettingUser): Promise<UserType> {
        try {
            const response = await instanceServer.post<UserType>('/edit-settings-user', data);

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

    async addNoteUser(text: string): Promise<NoteType> {
        try {
            const response = await instanceServer.post<NoteType>('/add-note-user', {text});

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

    async deleteNoteUser(id: string): Promise<NoteType> {
        try {
            const response = await instanceServer.delete<NoteType>(`/delete-note-user/${id}`);

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

    async getNotesUser(): Promise<NoteType[]> {
        try {
            const response = await instanceServer.get<NoteType[]>('/get-notes-user');

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

    async changeNoteUser(data: ChangeNoteRequestType): Promise<NoteType> {
        try {
            const response = await instanceServer.patch<NoteType>('/change-note-user', data);

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

    async addProject(data: AddProjectRequestType): Promise<ProjectType> {
        try {
            const response = await instanceServer.post<ProjectType>('/add-project', data);

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

    async getProjects(): Promise<ProjectType[]> {
        try {
            const response = await instanceServer.get<ProjectType[]>('/get-projects');

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

export default new UserService();