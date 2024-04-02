import {FileType} from "./FileType";
import {NoteType} from "./NoteType";

export interface ProjectType {
    id: string,
    isActive: boolean,
    name: string,
    logo: FileType | string | null,
    administrator: string,
    team: string[],
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
    files: {
        brif: string | null,
        contract: string | null,
        strategy: string | null
    },
    notes: NoteType[],
    customerData?: {
        name: string,
        surname: string
        email: string,
        phone: string
    }
}