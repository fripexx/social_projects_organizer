import {FileType, PhotoType} from "../../store/types/FileType";

export interface QueryMediaRequestType {
    projectId: string,
    limit: number,
    skip: number,
    type?: string | string[]
}

export interface DeleteMediaRequestType {
    idMedia: string,
    projectId: string
}

export interface GetMediaResponseType {
    total: number,
    media: (FileType | PhotoType)[]
}