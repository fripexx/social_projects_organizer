import {FileType, PhotoType} from "./FileType";

export interface MessageType {
    id: string,
    chat: string,
    sender: string,
    content: string,
    isRead: boolean,
    timeSend: Date,
    files: (FileType | PhotoType)[]
}