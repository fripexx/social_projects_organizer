const ChatService = require("../service/chat-service");
const ProjectModal = require("../models/project-model");
const ApiError = require("../exceptions/api-error");
const FileService = require("../service/file-service");

class ChatController {
    async sendMessage(req, res, next, io) {
        try {
            const user = await req.user;
            const files = req.files;
            const { chat, model, content } = req.body;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, 'team.user': user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                const idsFile = []

                if(files && Array.isArray(files)) {
                    for (const file of files) {
                        const fileData = await FileService.uploadFile(file, user, chat, "Chat");
                        idsFile.push(fileData.id);
                    }
                }

                const message = await ChatService.addMessage(chat, user.id, content, idsFile);
                io.to(chat).emit('newMessage', message);
            }

            return res.json();
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new ChatController();