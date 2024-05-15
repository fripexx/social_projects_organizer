const UploadMedia = require('../utils/UploadMedia')

// Middleware для обробки фотографій
const uploadMediaLibraryMiddleware = async (req, res, next) => {
    if (!req.files?.media) return next();

    const files = Array.isArray(req.files.media) ? req.files.media : [req.files.media];
    const currentDate = new Date();
    const uploadDir = `uploads/media_library/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;

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

module.exports = uploadMediaLibraryMiddleware;