const UploadMedia = require("../utils/UploadMedia");
const ApiError = require("../exceptions/api-error");

// Middleware для обробки файлів чату
const uploadChatMiddleware = async (req, res, next) => {
    if (!req.files?.chatFiles) {
        req.files = []
        return next();
    }

    try {
        const { chat } = req.body;

        if(!chat) throw ApiError.BadRequest('Відсутній ідентифікатор чату');

        const files = Array.isArray(req.files.chatFiles) ? req.files.chatFiles : [req.files.chatFiles];
        const currentDate = new Date();
        const uploadDir = `uploads/private/chats/${chat}/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;
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