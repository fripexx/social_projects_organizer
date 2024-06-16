const UploadMedia = require('../utils/UploadMedia')
const ApiError = require("../exceptions/api-error");

// Middleware для обробки фотографій
const uploadMediaLibraryMiddleware = async (req, res, next) => {
    if (!req.files?.media) return next();

    try {
        const { projectId } = req.body;

        if(!projectId) throw ApiError.BadRequest('Відсутній ідентифікатор проєкту');

        const files = Array.isArray(req.files.media) ? req.files.media : [req.files.media];
        const currentDate = new Date();
        const uploadDir = `uploads/private/media_library/${projectId}/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;
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