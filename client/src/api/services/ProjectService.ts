import instanceServer from "../instanceServer";
import {AxiosRequestConfig, isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {ProjectType} from "../../store/types/ProjectType";
import {NoteType} from "../../store/types/NoteType";
import {
    AddNoteInProjectRequestType, AddUserInTeamRequestType,
    ChangeNoteDataRequestType,
    ChangeProjectAdminRequestType,
    ChangeRoleUserRequestType,
    DeleteNoteInProjectRequestType,
    LeaveProjectRequestType, RemoveUserFromTeamRequestType
} from "../types/ProjectServiceTypes";
import {BasicUserInfo} from "../../store/types/UserType";
import {BasicTeamMemberType} from "../../store/types/TeamMemberType";

class ProjectService {
    async getProject(id: string): Promise<ProjectType> {
        try {
            const config: AxiosRequestConfig = {params: {id}}
            const response = await instanceServer.get<ProjectType>('/get-project', config);

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

    async editSettingsProject(data: FormData): Promise<ProjectType> {
        try {
            const config: AxiosRequestConfig = {headers: {'Content-Type': 'multipart/form-data'}}
            const response = await instanceServer.put<ProjectType>('/edit-settings-project', data, config);

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

    async getNotesProject(id: string): Promise<NoteType[]> {
        try {
            const config: AxiosRequestConfig = {params: {id}}
            const response = await instanceServer.get<NoteType[]>('/get-notes-project', config);

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

    async addNoteInProject(data: AddNoteInProjectRequestType): Promise<NoteType> {
        try {
            const response = await instanceServer.post<NoteType>('/add-note-in-project', data);

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

    async deleteNoteInProject(data: DeleteNoteInProjectRequestType): Promise<NoteType> {
        try {
            const config: AxiosRequestConfig = {params: data}
            const response = await instanceServer.delete<NoteType>('/delete-note-in-project', config);

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

    async changeNoteInProject(data: ChangeNoteDataRequestType): Promise<NoteType> {
        try {
            const response = await instanceServer.patch<NoteType>('/change-note-in-project', data);

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

    async getProjectTeam(projectId: string): Promise<BasicUserInfo[]> {
        try {
            const config: AxiosRequestConfig = {params: {projectId}}
            const response = await instanceServer.get<BasicUserInfo[]>('/get-project-team', config);

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

    async changeProjectAdministrator(data: ChangeProjectAdminRequestType): Promise<void> {
        try {
            await instanceServer.patch<void>('/change-project-administrator', data);
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

    async changeRoleUserRequest(data: ChangeRoleUserRequestType): Promise<BasicTeamMemberType[]> {
        try {
            const response = await instanceServer.patch<BasicTeamMemberType[]>(`/change-role-user`, data);

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

    async leaveProject(data: LeaveProjectRequestType): Promise<BasicTeamMemberType[]> {
        try {
            const response = await instanceServer.patch<BasicTeamMemberType[]>('/leave-project', data);

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

    async removeUserFromTeam(data: RemoveUserFromTeamRequestType): Promise<BasicTeamMemberType[]> {
        try {
            const response = await instanceServer.patch<BasicTeamMemberType[]>('/remove-user-from-team', data);

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

    async addUserInTeam(data: AddUserInTeamRequestType): Promise<BasicTeamMemberType[]> {
        try {
            const response = await instanceServer.patch<BasicTeamMemberType[]>('/add-user-in-team', data);

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

export default new ProjectService();