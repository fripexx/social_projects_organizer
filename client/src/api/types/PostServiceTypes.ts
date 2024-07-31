import {PostType} from "../../store/types/PostType";

export interface GetPostRequestType {
    project: string;
    id: string;
}

export interface GetPostsResponseType {
    posts: PostType[],
    total: number,
}