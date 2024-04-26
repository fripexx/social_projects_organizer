import {PhotoType} from "./FileType";

export interface BasicUserInfo {
    id: string,
    typeUser: 'customer' | 'smm_manager' | 'targetologist' | 'designer',
    name: string,
    surname: string,
    email: string,
    telegram: string,
    phone: string,
    photo: PhotoType | null,
}

export interface UserType extends BasicUserInfo {

    darkMode: boolean,
    pushNotifications: boolean,
    isActivated: boolean,
}