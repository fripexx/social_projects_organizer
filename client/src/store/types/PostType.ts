import {PostStatus} from "../reducers/PostStatus";
import {AspectRatio} from "../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";


/**
 * Базовий тип для всіх постів
 */

export interface PostBase {
    id: string;
    project: string;
    status: PostStatus;
    author: string;
    dateCreated: Date;
    datePublish: Date;
    social: 'instagram' | 'tiktok'
}


/**
 * Базовий тип для постів Instagram
 */

interface InstagramPostType extends PostBase {
    social: "instagram";
    typePost: 'publication' | 'stories' | 'reels';
}

// InstagramPublication
export interface InstagramPublicationType extends InstagramPostType {
    typePost: "publication";
    params: InstagramPublicationParams;
}

interface InstagramPublicationParams {
    media: string[];
    description: string;
    aspectRatio: AspectRatio;
}


// InstagramStoriesType
export interface InstagramStoriesType extends InstagramPostType {
    typePost: 'stories';
    params: InstagramStoriesParams;
}

interface InstagramStoriesParams {
    media: string;
}


// InstagramReels
export interface InstagramReelsType extends InstagramPostType {
    typePost: 'reels';
    params: InstagramReelsParams;
}

interface InstagramReelsParams {
    media: string;
    musicTrack: string;
    description: string;
}


/**
 * Базовий тип для постів TikTok
 */

export interface TikTokPostType extends PostBase {
    social: "tiktok";
    typePost: 'publication' | 'stories';
}

// TikTokPublicationType
export interface TikTokPublicationType extends TikTokPostType {
    typePost: 'publication';
    params: TikTokPublicationParams;
}
interface TikTokPublicationParams {
    media: string[];
    description: string;
}

// TikTokStoriesType
export interface TikTokStoriesType extends TikTokPostType {
    typePost: 'stories';
    params: TikTokStoriesParams;
}

interface TikTokStoriesParams {
    media: string;
}

export type PostType = InstagramPublicationType | InstagramStoriesType | InstagramReelsType | TikTokPublicationType | TikTokStoriesType;