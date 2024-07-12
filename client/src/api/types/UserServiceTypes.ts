import {UserType} from "../../store/types/UserType";

export interface LoginRequestType {
    email: string,
    password: string
}

export interface LoginResponseType {
    accessToken: string,
    refreshToken: string,
    user: UserType
}

export interface RegistrationRequestType {
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
}

export interface ChangeNoteRequestType {
    noteId: string,
    text: string
}

export interface AddProjectRequestType {
    name: string;
    role: string;
}