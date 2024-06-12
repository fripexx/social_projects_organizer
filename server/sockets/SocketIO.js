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
        //joinChat
        const joinChat = async ({chat, model}) => {
            await ChatController.joinChat(socket, chat, model);
        }
        socket.on('joinChat', joinChat);


        //disconnect
        const disconnect = async() => {
            await ChatController.disconnect(socket);
        }
        socket.on('disconnect', disconnect);


        //getMessages
        const getMessages = async({chat, model}) => {
            await ChatController.getMessages(socket, chat, model);
        }
        socket.on('getMessages', getMessages);


        //loadMessages
        const loadMessages = async({chat, model, skip}) => {
            await ChatController.loadMessages(socket, chat, model, skip);
        }
        socket.on('loadMessages', loadMessages);


        //sendMessage
        const sendMessage = async(data) => {
            await ChatController.sendMessage(socket, io, data);
        }
        socket.on('sendMessage',sendMessage) ;

    });

    return io;
};

module.exports = setupSocket;