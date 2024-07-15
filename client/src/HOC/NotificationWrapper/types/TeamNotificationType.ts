import {SocketNotificationType} from "./SocketNotificationType";

export interface TeamNotificationType extends SocketNotificationType {
    message: string;
}