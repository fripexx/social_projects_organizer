const ApiError = require("../exceptions/api-error");
const MessageModel  = require('../models/message-model');
const MessageDto = require('../dtos/message-dto');
const Message = require("../models/message-model");

class ChatService {
    async addMessage(chat, sender, content, files) {
        if (!content && files.length === 0) throw ApiError.BadRequest("Запит обов'язвково має мати текстове повідомлення або файл.");

        const message = new MessageModel({
            chat: chat,
            sender: sender,
            content,
            readBy: [],
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
            .lean();

        return messages.map(message => new MessageDto(message))
    }
    async getUnreadMessages(chat, user) {
        const unreadMessagesCount = await Message.countDocuments({
            chat,
            sender: { $ne: user.id },
            readBy: { $ne: user.id }
        }).lean();

        return unreadMessagesCount;
    }
    async readMessage(messageId, user) {
        const message = await Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { readBy: user.id } },
            { new: true }
        ).lean();

        if(!message) throw ApiError.BadRequest('Не знайдено повідомлення з таким ідентифікатором');

        return new MessageDto(message);
    }
}

module.exports = new ChatService();