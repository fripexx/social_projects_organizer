import {BasicUserInfo} from "./UserType";

export interface NoteType {
    id: string,
    text: string,
    dateCreated: Date,
    author: string | BasicUserInfo,
    belongTo: {
        id: string,
        model: "User" | "Project"
    }
}

