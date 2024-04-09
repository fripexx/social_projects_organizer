interface NoteUserType {
    id: string,
    name: string,
    surname: string,
    photo: {
        path: string,
        cropped: {
            [key: string]: string,
        }
    } | null
}
export interface NoteType {
    id: string,
    text: string,
    dateCreated: Date,
    author: string | NoteUserType,
    belongTo: {
        id: string,
        model: "User" | "Project"
    }
}

