export interface NoteType {
    id: string,
    text: string,
    dateCreated: Date,
    author: {
        id: string,
        photo: string
    },
    belongTo: {
        id: string,
        model: "User" | "Project"
    },
}