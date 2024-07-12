import {PhotoType} from "./FileType";

export interface BasicUserInfo {
    id: string,
    name: string,
    surname: string,
    email: string,
    telegram: string,
    phone: string,
    photo: PhotoType | null,
}

export interface SettingUser {
    darkMode: boolean,
    pushNotifications: boolean,
}

export interface UserType extends BasicUserInfo, SettingUser {
    isActivated: boolean,
}