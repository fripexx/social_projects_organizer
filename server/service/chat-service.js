const ApiError = require("../exceptions/api-error");
const MessageModel  = require('../models/message-model');
const MessageDto = require('../dtos/message-dto');
const Message = require("../models/message-model");

class ChatService {
    async addMessage(chat, sender, content, files) {
        const message = new MessageModel({
            chat: chat,
            sender: sender,
            content,
            isRead: false,
            timeSend: Date.now(),
            files
        });
        await message.save();

        return new MessageDto(message);
    }
    async getMessages(chat, skip = 0) {
        const limit = 20;
        const messages = await Message.find({ chat })
            .sort({ timeSend: -1 })
            .skip(skip)
            .limit(Number(limit));

        return messages.map(message => new MessageDto(message))
    }
}

module.exports = new ChatService();