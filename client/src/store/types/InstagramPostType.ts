import {BasicUserInfo} from "./UserType";
import {FileType, PhotoType} from "./FileType";
import {PostStatus} from "../reducers/PostStatus";

export interface InstagramPostType {
    id: string,
    project: string,
    status: PostStatus,
    author: BasicUserInfo,
    dateCreated: Date,
    datePublish: Date,
    description: string,
    typePost: 'post' | 'stories' | 'reels',
    uploads: (FileType | PhotoType)[] | FileType | PhotoType,
}