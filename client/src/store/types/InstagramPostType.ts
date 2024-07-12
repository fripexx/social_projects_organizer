import {PostStatus} from "../reducers/PostStatus";
import {AspectRatio} from "../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";

interface InstagramPublication {
    media: string[];
    description: string;
    aspectRatio: AspectRatio;
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
    typePost: 'publication' | 'stories' | 'reels';
}

export interface InstagramPublicationType extends InstagramBase {
    typePost: "publication";
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