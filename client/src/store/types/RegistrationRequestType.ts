import {UserType} from "./UserType";

export interface RegistrationRequestType extends UserType{
    password: string,
}