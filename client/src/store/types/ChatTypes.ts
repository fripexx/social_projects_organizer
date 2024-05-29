export interface ChatType {
    id: string;
    belongToId: string,
    belongToModel: string,
    messages: MessageType[]
}

export interface MessageType {
    id: string,
    sender: string,
    chat: string,
    content: string,
    isRead: boolean,
    timeSend: Date,
    files: MessageFile[]
}

interface MessageFile {
    url: string,
    type: 'image' | 'application' | 'video' | 'text',
}