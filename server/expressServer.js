const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const sharp = require("sharp");
const setupRouter = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const http = require("http");
const setupSocketIO = require("./SocketIO/SocketIO");

const setupExpressServer = () => {
    const app = express();
    const server = http.createServer(app);
    const io = setupSocketIO(server);

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
    app.use(fileUpload());
    app.use('/api', setupRouter({io}));
    app.use('/uploads', express.static('uploads'));
    app.use(errorMiddleware);

    sharp.cache(false);

    return server;
};

module.exports = setupExpressServer;