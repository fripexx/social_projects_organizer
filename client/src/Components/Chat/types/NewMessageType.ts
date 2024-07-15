import {MessageType} from "../../../store/types/MessageType";

export interface NewMessageType {
    chatId: string;
    message: MessageType;
}