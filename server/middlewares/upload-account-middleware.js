const UploadMedia = require("../utils/UploadMedia");

// Middleware для обробки фотографій
const uploadAccountMiddleware = async (req, res, next) => {
    if (!req.files?.photo) return next();

    const file = req.files.photo;
    const uploadDir = `uploads/profile_photos`;

    try {
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

module.exports = uploadAccountMiddleware;