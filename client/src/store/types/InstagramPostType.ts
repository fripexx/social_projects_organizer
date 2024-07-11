import {PostStatus} from "../reducers/PostStatus";

interface InstagramPublication {
    media: string[];
    description: string;
    aspectRatio: '1.91/1' | '1/1' | '4/5';
}

interface InstagramStories {
    media: string;
    description: string;
}

interface InstagramReels {
    media: string;
    musicTrack: string;
}

interface InstagramBase {
    id: string;
    project: string;
    status: PostStatus;
    author: string;
    dateCreated: Date;
    datePublish: Date;
    description: string;
    typePost: 'publication' | 'stories' | 'reels';
}

export interface InstagramPublicationType extends InstagramBase {
    typePost: "reels";
    params: InstagramPublication;
}

export interface InstagramStoriesType extends InstagramBase {
    typePost: 'stories';
    params: InstagramStories;
}

export interface InstagramReelsType extends InstagramBase {
    typePost: 'reels';
    params: InstagramReels;
}

type InstagramPostType = InstagramPublicationType | InstagramStoriesType | InstagramReelsType;

export default InstagramPostType;