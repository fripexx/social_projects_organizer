const ApiError = require("../exceptions/api-error");
const MessageModel  = require('../models/message-model');
const MessageDto = require('../dtos/message-dto');
const Message = require("../models/message-model");
const mongoose = require('mongoose');
const FileService = require("../service/file-service")

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

    async getMessages(chat, skip = 0, limit = 20) {
        const filter = {
            chat,
        }
        const options = {
            sort: { timeSend: -1 },
            skip: skip,
            limit: limit,
            populate: {
                path: 'files',
                model: 'File'
            },
            lean: true
        }
        const messages = await Message.find(filter, null, options);

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
            {$addToSet: {readBy: user.id}},
            {new: true}
        ).populate({
            path: 'files',
            model: 'File'
        }).lean();

        if(!message) throw ApiError.BadRequest('Не знайдено повідомлення з таким ідентифікатором');

        return new MessageDto(message);
    }

    async deleteMessage(message, user) {
        if(!mongoose.Types.ObjectId.isValid(message) && !Array.isArray(message)) throw ApiError.BadRequest("message повинен бути валідним ObjectId або масивом значень валідних ObjectId");

        if(Array.isArray(message)) {
            const returnMessages = [];

            for (let i = 0; i < message.length; i++) {
                if(!mongoose.Types.ObjectId.isValid(message[i])) throw ApiError.BadRequest("Кожне значення message повинно бути валідним ObjectId");


                /**
                 * Видалення повідомлення
                 */

                const deleteMessage = await Message.findByIdAndDelete(message[i]);

                if(!deleteMessage) throw ApiError.BadRequest(`Помилка при видалені повідомленя (${message[i]}).`);

                returnMessages.push(message[i]);


                /**
                 * Видалення файлів повідомлення
                 */

                const files = deleteMessage.files;

                for (let j = 0; j < files.length; j++) {
                    const deleteFile = await FileService.deleteFile(files[j]);
                    if(!deleteFile) throw ApiError.BadRequest(`Помилка при видалені файлу (${message[i]}).`);
                }
            }

            return returnMessages;
        } else {
            if(!mongoose.Types.ObjectId.isValid(message)) throw ApiError.BadRequest("message повинно бути валідним ObjectId");

            const deleteMessage = await Message.findByIdAndDelete(message);

            if(!deleteMessage) throw ApiError.BadRequest(`Повідомлення з таким id (${message}) не знайдено.`);

            return deleteMessage._id;

        }
    }
}

module.exports = new ChatService();