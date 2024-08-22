import {PhotoType} from "./FileType";
import {NoteType} from "./NoteType";
import {BasicTeamMemberType} from "./TeamMemberType";

export interface ProjectType {
    id: string,
    isActive: boolean,
    name: string,
    logo: PhotoType | string | null,
    administrator: string,
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