export interface FileType {
    id: string,
    type: 'image' | 'application' | 'video' | 'text',
    extension: string,
    mimetype: string,
    dateCreated: Date,
    path: string,
    author: string,
    name: string,
}

export interface PhotoCroppedType {
    [key: string]: string,
}

export interface PhotoType extends FileType {
    cropped: PhotoCroppedType
}