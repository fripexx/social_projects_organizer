import {FileType, PhotoType} from "./FileType";

export interface MessageType {
    id: string,
    chat: string,
    sender: string,
    content: string,
    readBy: string[],
    timeSend: Date,
    files: (FileType | PhotoType)[]
}