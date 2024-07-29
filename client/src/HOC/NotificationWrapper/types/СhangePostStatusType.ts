import {SocketNotificationType} from "./SocketNotificationType";

export interface ChangePostStatusType extends SocketNotificationType {
    postId: string;
    to: string[];
    message: string;
}