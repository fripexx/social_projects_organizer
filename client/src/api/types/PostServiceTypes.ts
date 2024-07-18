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