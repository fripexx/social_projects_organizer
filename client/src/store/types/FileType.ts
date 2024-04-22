export interface FileType {
    type: String,
    mimetype: String,
    dateCreated: Date,
    path: string,
}

export interface PhotoType extends FileType {
    cropped: {
        [key: string]: string,
    },
}