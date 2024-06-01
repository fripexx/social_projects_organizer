export interface MessageType {
    id: string,
    chat: string,
    sender: string,
    content: string,
    isRead: boolean,
    timeSend: Date,
    files: MessageFile[]
}

interface MessageFile {
    url: string,
    type: 'image' | 'application' | 'video' | 'text',
}