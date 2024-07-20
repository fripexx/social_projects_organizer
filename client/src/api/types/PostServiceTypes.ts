import {PostStatus} from "../../store/reducers/PostStatus";

export interface AddInstagramPublicationRequestType {
    project: string;
    description: string;
    aspectRatio: string;
    datePublish: Date;
    media: string[]
}

export interface GetInstagramPublicationRequestType {
    project: string;
    id: string;
}

export interface UpdateInstagramPublicationRequestType {
    id: string;
    description: string;
    aspectRatio: string;
    datePublish: Date;
    media: string[]
}

export interface DeletePostRequestType {
    id: string;
}

export interface GetPostsRequestType {
    project: string;
    skip: number;
    limit: number;
    social?: "instagram" | "tiktok";
    typePost?: "publication" | "stories" | "reels";
    status?: PostStatus
}