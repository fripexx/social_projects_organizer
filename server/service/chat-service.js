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

        const findMessage = await Message.findById(message._id)
            .populate({
                path: 'files',
                model: 'File'
            })
            .lean();

        return new MessageDto(findMessage);
    }
    async getMessages(chat, skip = 0) {
        const limit = 20;
        const messages = await Message.find({ chat })
            .sort({ timeSend: -1 })
            .skip(skip)
            .limit(Number(limit))
            .populate({
                path: 'files',
                model: 'File'
            })

        return messages.map(message => new MessageDto(message))
    }
}

module.exports = new ChatService();