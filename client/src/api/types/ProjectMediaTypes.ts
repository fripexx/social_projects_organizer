import {FileType, PhotoType} from "../../store/types/FileType";

export interface QueryMediaRequestType {
    projectId: string,
    limit: number,
    skip: number,
    type?: string | string[],
    mediaIds?: string[]
}

export interface GetMediaRequestType {
    projectId: string,
    mediaId: string,
}

export interface DeleteMediaRequestType {
    idMedia: string,
    projectId: string
}

export interface GetMediaResponseType {
    total: number,
    media: (FileType | PhotoType)[]
}