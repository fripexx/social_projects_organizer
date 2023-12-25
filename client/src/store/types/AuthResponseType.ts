import {UserType} from "./UserType";

export interface AuthResponseType {
    accessToken: string,
    refreshToken: string,
    user: UserType
}