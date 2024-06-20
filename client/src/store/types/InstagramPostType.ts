import {BasicUserInfo} from "./UserType";
import {FileType, PhotoType} from "./FileType";

export interface InstagramPostType {
    id: string,
    project: string,
    status: 'publish' | 'rejected' | 'edit' | 'confirmed',
    author: BasicUserInfo,
    dateCreated: Date,
    datePublish: Date,
    description: string,
    typePost: 'post' | 'stories' | 'reels',
    uploads: (FileType | PhotoType)[] | FileType | PhotoType,
}