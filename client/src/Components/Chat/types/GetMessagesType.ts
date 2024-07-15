import {MessageType} from "../../../store/types/MessageType";

export interface GetMessagesType {
    chatId: string;
    messages: MessageType[];
}