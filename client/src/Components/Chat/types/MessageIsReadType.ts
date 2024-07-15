import {MessageType} from "../../../store/types/MessageType";

export interface MessageIsReadType {
    chatId: string;
    readMessage: MessageType
}