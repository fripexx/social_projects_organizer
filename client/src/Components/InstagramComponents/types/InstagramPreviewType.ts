import {ProfileType} from "./ProfileType";

export interface InstagramPreviewType {
    className?: string;
    profile: ProfileType,
    colabProfile?: ProfileType,
    width?: number,
}