const { Server } = require('socket.io');
const tokenService = require('../service/token-service');
const ChatController = require('../controllers/chat-controller');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.query.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }

            const accessToken = token.split(" ")[1];
            if (!accessToken) {
                return next(new Error('Authentication error'));
            }

            const userData = await tokenService.validateAccessToken(accessToken);
            if (!userData) {
                return next(new Error('Authentication error'));
            }

            socket.user = userData; // Додати користувача до сокету
            next();
        } catch (err) {
            return next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {

        socket.on('joinChat', ({chat, model}) => {
            ChatController.joinChat(socket, chat, model);
        });

        socket.on('disconnect', () => {
            ChatController.disconnect(socket);
        });

        socket.on('getMessages', ({chat, model}) => {
            ChatController.getMessages(socket, chat, model);
        });

        socket.on('loadMessages', ({chat, model, skip}) => {
            ChatController.loadMessages(socket, chat, model, skip);
        });

        socket.on('sendMessage', (data) => {
            ChatController.sendMessage(socket, io, data);
        });

    });

    return io;
};

module.exports = setupSocket;