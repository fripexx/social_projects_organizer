import {FileType, PhotoType} from "./FileType";

export interface GetMediaResponseType {
    total: number,
    media: (FileType | PhotoType)[]
}