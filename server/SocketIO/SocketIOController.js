const ApiError = require("../exceptions/api-error");
const ProjectModal = require("../models/project-model");
const ChatService = require("../service/chat-service");

class SocketIOController {
    async joinRoom(socket, room, model) {
        try {
            const user = socket?.user;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: room, 'team.user': user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                socket.join(room);
                socket.emit("joinedRoom", room)
            }

            if(model === "Post") {

            }

        } catch (e) {
            console.error(e);
        }
    }
    async leaveRoom(socket, room) {
        try {
            socket.leave(room)
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
                const findProject = await ProjectModal.findOne({ _id: chat, 'team.user': user.id }).lean();

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
    async getUnreadMessages(socket, chat, model) {
        try {
            const user = socket.user;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, 'team.user': user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                const unreadCount = await ChatService.getUnreadMessages(chat, user);

                socket.emit('setUnreadMessages', unreadCount)
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
                const findProject = await ProjectModal.findOne({ _id: chat, 'team.user': user.id }).lean();

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
    async readMessage(socket, messageId, chat, model, io) {
        try{
            const user = socket.user;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                const findProject = await ProjectModal.findOne({ _id: chat, 'team.user': user.id }).lean();

                if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.');

                const readMessage = await ChatService.readMessage(messageId, user);

                io.to(chat).emit('messageIsRead', readMessage)
            }
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new SocketIOController()