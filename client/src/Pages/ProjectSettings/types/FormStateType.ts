export interface FormStateType {
    name: string,
    color: string,
    instagram: string,
    instagramTokenAPI: string,
    facebook: string,
    tiktok: string,
    linkFigma: string,
    linkCanva: string,
    logo: File | string,

    [key: string]: string | File;
}