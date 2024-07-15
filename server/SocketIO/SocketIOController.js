const ApiError = require("../exceptions/api-error");
const ChatService = require("../service/chat-service");
const InstagramPostService = require("../service/instagram-post-service");
const ProjectService = require("../service/project-service");

class SocketIOController {
    async joinRoom(socket, room, model) {
        try {
            const user = socket?.user;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {
                // Перевірка доступу до проєкту
                await ProjectService.checkUserAccessToProject(room, user);

                socket.join(room);
                socket.emit("joinedRoom", room)
            }

            if(model === "Post") {
                // Перевірка доступу до посту
                await InstagramPostService.checkUserAccessToPost(room, user);

                socket.join(room);
                socket.emit("joinedRoom", room)
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
                // Перевірка доступу до проєкту
                await ProjectService.checkUserAccessToProject(chat, user);

                const messages = await ChatService.getMessages(chat);

                socket.emit('getMessages', {chatId: chat, messages})
            }

            if(model === "Post") {
                // Перевірка доступу до посту
                await InstagramPostService.checkUserAccessToPost(chat, user);

                const messages = await ChatService.getMessages(chat);
                socket.emit('getMessages', {chatId: chat, messages})
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
                // Перевірка доступу до проєкту
                await ProjectService.checkUserAccessToProject(chat, user);

                const unreadCount = await ChatService.getUnreadMessages(chat, user);

                socket.emit('setUnreadMessages', {chatId: chat, unreadCount})
            }

            if(model === "Post") {
                // Перевірка доступу до посту
                await InstagramPostService.checkUserAccessToPost(chat, user);

                const unreadCount = await ChatService.getUnreadMessages(chat, user);
                socket.emit('setUnreadMessages', {chatId: chat, unreadCount})
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
                // Перевірка доступу до проєкту
                await ProjectService.checkUserAccessToProject(chat, user);

                const messages = await ChatService.getMessages(chat, skip);

                socket.emit('loadMessages', {chatId: chat, messages})
            }

            if(model === "Post") {
                // Перевірка доступу до посту
                await InstagramPostService.checkUserAccessToPost(chat, user);

                const messages = await ChatService.getMessages(chat, skip);
                socket.emit('loadMessages', {chatId: chat, messages})
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
                // Перевірка доступу до проєкту
                await ProjectService.checkUserAccessToProject(chat, user);

                const readMessage = await ChatService.readMessage(messageId, user);

                io.to(chat).emit('messageIsRead', {chatId: chat, readMessage})
            }

            if(model === "Post") {
                // Перевірка доступу до посту
                await InstagramPostService.checkUserAccessToPost(chat, user);

                const readMessage = await ChatService.readMessage(messageId, user);
                io.to(chat).emit('messageIsRead', {chatId: chat, readMessage})
            }
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new SocketIOController()