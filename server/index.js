require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const fileUploadMiddleware = require('./middlewares/upload-account-middleware')
const errorMiddleware = require('./middlewares/error-middleware')
const fileUpload = require('express-fileupload');
const sharp = require("sharp");
const http = require('http');
const setupSocket = require('./sockets/SocketIO');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(fileUpload());
app.use('/api', router)
app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware)

sharp.cache(false);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();