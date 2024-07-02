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
        const joinProject = async ({projectId, model}) => await SocketIOController.joinProject(socket, projectId, model);
        socket.on('joinProject', joinProject);

        const disconnect = async() => await SocketIOController.disconnect(socket)
        socket.on('disconnect', disconnect);

        const getMessages = async({chat, model}) => await SocketIOController.getMessages(socket, chat, model);
        socket.on('getMessages', getMessages);

        const getUnreadMessages = async({chat, model}) => await SocketIOController.getUnreadMessages(socket, chat, model);
        socket.on('getUnreadMessages', getUnreadMessages);

        const loadMessages = async({chat, model, skip}) => await SocketIOController.loadMessages(socket, chat, model, skip);
        socket.on('loadMessages', loadMessages);

        const readMessage = async ({ messageId, chat, model }) => await SocketIOController.readMessage(socket, messageId, chat, model, io);
        socket.on('readMessage', readMessage);
    });
    return io;
};

module.exports = setupSocket;