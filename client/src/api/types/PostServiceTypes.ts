import {PostStatus} from "../../store/reducers/PostStatus";
import {PostType} from "../../store/types/PostType";

export interface GetPostRequestType {
    project: string;
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

export interface GetPostsResponseType {
    posts: PostType[],
    total: number,
}