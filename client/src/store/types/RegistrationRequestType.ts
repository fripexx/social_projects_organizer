import {UserType} from "./UserType";

export interface RegistrationRequestType {
    typeUser: 'customer' | 'smm_manager' | 'targetologist' | 'designer',
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
}