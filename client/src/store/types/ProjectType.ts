import {FileType, PhotoType} from "./FileType";
import {NoteType} from "./NoteType";
import {BasicUserInfo} from "./UserType";
import {BasicTeamMemberType} from "./TeamMemberType";

export interface ProjectType {
    id: string,
    isActive: boolean,
    name: string,
    logo: PhotoType | string | null,
    administrator: string,
    customer: BasicUserInfo | string | null,
    team: BasicTeamMemberType[],
    color: string | null,
    instagram: string | null,
    instagramTokenAPI: string | null,
    facebook: string | null,
    tiktok: string | null,
    linkFigma: string | null,
    linkCanva: string | null,
    workingHours: {
        from: string | null,
        to: string | null
    },
    workingDays: string | null,
    notes: NoteType[],
}