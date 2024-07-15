export interface NotificationType {
    id: string,
    projectName: string;
    message: string,
    timestamp: number,
    link?: string,
    isRead: boolean
}