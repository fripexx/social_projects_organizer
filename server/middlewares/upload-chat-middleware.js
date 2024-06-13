const UploadMedia = require("../utils/UploadMedia");

// Middleware для обробки файлів чату
const uploadChatMiddleware = async (req, res, next) => {
    if (!req.files?.chatFiles) {
        req.files = []
        return next();
    }

    const files = Array.isArray(req.files.chatFiles) ? req.files.chatFiles : [req.files.chatFiles];
    const currentDate = new Date();
    const uploadDir = `uploads/chat_files/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;

    try {
        const filesData = []

        for (const file of files) {
            const fileObj = await new UploadMedia(file, uploadDir);
            await fileObj.saveFile();
            const data = fileObj.getData()

            filesData.push(data)
        }

        req.files = filesData;

        next();
    } catch (err) {
        console.error('Помилка завантаження файлу:', err);
        next();
    }
};

module.exports = uploadChatMiddleware;