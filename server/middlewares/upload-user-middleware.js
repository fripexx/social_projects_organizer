const UploadMedia = require("../utils/UploadMedia");

// Middleware для обробки фотографій
const uploadUserMiddleware = async (req, res, next) => {
    if (!req.files?.photo) return next();

    try {
        const file = req.files.photo;
        const currentDate = new Date();
        const uploadDir = `uploads/public/profile_photos/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`

        const fileObj = await new UploadMedia(file, uploadDir);
        await fileObj.saveFile();
        const data = fileObj.getData()

        req.photo = data

        next();
    } catch (err) {
        console.error('Error processing photo:', err);
        next();
    }
};

module.exports = uploadUserMiddleware;