import {MessageType} from "../../../store/types/MessageType";

export interface LoadMessagesType {
    chatId: string;
    messages: MessageType[];
}