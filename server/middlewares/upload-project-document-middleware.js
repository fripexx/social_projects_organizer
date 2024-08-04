const UploadMedia = require("../utils/UploadMedia");
const ApiError = require("../exceptions/api-error");
const mongoose = require('mongoose');

// Middleware для документів проєкту
const uploadProjectDocumentMiddleware = async (req, res, next) => {
    try {
        const fileReq = req.files?.file;


        /**
         * Перевірка наявності файлу в запиті
         */

        if (!fileReq) throw ApiError.BadRequest('Відсутній файл документу в запиті');


        /**
         * Перевірка наявності ідентифікатора проєкту в запиті
         */

        const { projectId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(projectId)) throw ApiError.BadRequest('projectId повинен бути валідним ObjectId');


        /**
         * Перевірка mimetype файлу в запиті
         */

        const accessMime = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

        if(!accessMime.includes(fileReq.mimetype)) throw ApiError.BadRequest('Недопустимий тип файлу в запиті.');


        /**
         * Збереження файлу
         */
        const file = req.files.file;
        const currentDate = new Date();
        const uploadDir = `uploads/private/documents/${projectId}/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;

        const fileObj = await new UploadMedia(file, uploadDir);
        await fileObj.saveFile();

        req.file = fileObj.getData()

        next();
    } catch (err) {
        console.error('Error processing file:', err);
        next(err);
    }
};

module.exports = uploadProjectDocumentMiddleware;