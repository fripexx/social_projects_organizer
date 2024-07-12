import instanceServer from "../instanceServer";
import {isAxiosError} from "axios";
import {ErrorResponseType} from "../types/ErrorResponseType";
import {MessageType} from "../../store/types/MessageType";

class ChatService {
    async sendMessage(data: FormData): Promise<MessageType> {
        try {
            const response = await instanceServer.post<MessageType>('/send-message', data);

            return response.data;
        } catch (e) {
            const response: ErrorResponseType = {
                status: 0,
                message: 'Непередбачена помилка',
            };

            if (isAxiosError(e) && e.response) {
                response.status = e.response.status;
                response.message = e.response.data.message;
            }

            throw response;
        }
    }
}

export default new ChatService();