import {FileType} from "./FileType";

export interface UserType {
    id: string,
    typeUser: 'customer' | 'smm_manager' | 'targetologist' | 'designer',
    name: string,
    surname: string,
    email: string,
    phone: string,
    photo: FileType,
    telegram: string,
    darkMode: boolean,
    pushNotifications: boolean,
    isActivated: boolean,
}