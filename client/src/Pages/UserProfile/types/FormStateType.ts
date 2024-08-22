export interface FormStateType {
    name: string,
    surname: string,
    email: string,
    phone: string,
    photo: string | File,
    telegram: string,
    [key: string]: string | File;
}