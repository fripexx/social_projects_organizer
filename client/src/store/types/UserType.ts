import {FileType} from "./FileType";

export interface BasicUserInfo {
    id: string,
    name: string,
    surname: string,
    email: string,
    telegram: string,
    phone: string,
    photo: FileType | null,
}

export interface UserType extends BasicUserInfo {
    typeUser: 'customer' | 'smm_manager' | 'targetologist' | 'designer',
    darkMode: boolean,
    pushNotifications: boolean,
    isActivated: boolean,
}