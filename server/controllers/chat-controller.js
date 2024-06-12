const ChatService = require("../service/chat-service");
const ProjectModal = require("../models/project-model");
const ApiError = require("../exceptions/api-error");
const FileService = require("../service/file-service");

class ChatController {
    async joinChat(socket, chat, model) {
        try {
            const user = socket?.user;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, team: user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                socket.join(chat);
            }

            if(model === "Post") {

            }

        } catch (e) {
            console.error(e);
        }
    }
    async disconnect(socket) {
        try {
            socket.disconnect();
        } catch (e) {
            console.error(e);
        }
    }
    async getMessages(socket, chat, model) {
        try {
            const user = socket.user;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, team: user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                const messages = await ChatService.getMessages(chat);

                socket.emit('getMessages', messages)
            }

            if(model === "Post") {

            }

        } catch (e) {
            console.error(e);
        }
    }
    async loadMessages(socket, chat, model, skip) {
        try {
            const user = socket.user;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, team: user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                const messages = await ChatService.getMessages(chat, skip);

                socket.emit('loadMessages', messages)
            }

            if(model === "Post") {

            }

        } catch (e) {
            console.error(e);
        }
    }
    async sendMessage(socket, io, data) {
        try {
            const user = socket.user;
            const { chat, model, content, files } = data;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, team: user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                const message = await ChatService.addMessage(chat, user.id, content, files);

                io.to(chat).emit('newMessage', message);
            }

            if(model === "Post") {

            }

        } catch (e) {
            console.error(e);
        }
    }
    async sendMessageThunk(req, res, next) {
        try {
            const user = await req.user;
            const files = req.files;
            const { chat, model, content } = req.body;

            // console.log(files)

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, team: user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                const idsFile = []

                for (const file of files) {
                    const fileData = await FileService.uploadFile(file, user, chat, "Chat");
                    idsFile.push(fileData.id);
                }

                const message = await ChatService.addMessage(chat, user.id, content, idsFile);
            }

            return res.json();
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new ChatController();