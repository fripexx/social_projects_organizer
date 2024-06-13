const { Server } = require('socket.io');
const tokenService = require('../service/token-service');
const SocketIOController = require('../SocketIO/SocketIOController');

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
            if (!token) return next(new Error('Authentication error'));

            const accessToken = token.split(" ")[1];
            if (!accessToken) return next(new Error('Authentication error'));

            const userData = await tokenService.validateAccessToken(accessToken);
            if (!userData) return next(new Error('Authentication error'));

            socket.user = userData;
            next();
        } catch (err) {
            return next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        const joinChat = async ({chat, model}) => await SocketIOController.joinChat(socket, chat, model);
        socket.on('joinChat', joinChat);

        const disconnect = async() => await SocketIOController.disconnect(socket)
        socket.on('disconnect', disconnect);

        const getMessages = async({chat, model}) => await SocketIOController.getMessages(socket, chat, model);
        socket.on('getMessages', getMessages);

        const loadMessages = async({chat, model, skip}) => await SocketIOController.loadMessages(socket, chat, model, skip);
        socket.on('loadMessages', loadMessages);

        const sendMessage = async(data) => await SocketIOController.sendMessage(socket, io, data);
        socket.on('sendMessage',sendMessage) ;

    });
    return io;
};

module.exports = setupSocket;