import {SocketNotificationType} from "./SocketNotificationType";

export interface CommentPostType extends SocketNotificationType {
    postId: string;
    message: string;
}