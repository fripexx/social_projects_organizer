export interface FileType {
    type: String,
    mimetype: String,
    dateCreated: Date,
    path: string,
    cropped?: Cropped,
}

interface Cropped {
    [key: string]: string,
}