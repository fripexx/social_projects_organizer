import {FileType} from "./FileType";

export interface ProjectDocument {
    id: string;
    name: string;
    dateUpload: string;
    file: string | FileType | null;
}