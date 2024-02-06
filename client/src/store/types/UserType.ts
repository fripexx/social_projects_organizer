export interface UserType {
    id: string,
    typeUser: 'customer' | 'smm_manager' | 'targetologist' | 'designer',
    name: string,
    surname: string,
    email: string,
    phone: string,
    photo: string
}