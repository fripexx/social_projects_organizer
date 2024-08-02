import {PostStatus} from "../reducers/PostStatus";

export interface PostsQueryType {
    project: string;
    skip: number;
    limit?: number;
    social?: "instagram" | "tiktok";
    typePost?: "publication" | "stories" | "reels";
    status?: PostStatus,
    datePublish?: {
        from: string,
        to: string,
    },
}