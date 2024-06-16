const UploadMedia = require("../utils/UploadMedia");

// Middleware для обробки фотографій
const uploadProjectLogoMiddleware = async (req, res, next) => {
    if (!req.files?.logo) return next();

    try {
        const file = req.files.logo;
        const currentDate = new Date();
        const uploadDir = `uploads/public/project_logos/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;

        const fileObj = await new UploadMedia(file, uploadDir);
        await fileObj.saveFile();
        const data = fileObj.getData()

        req.logo = data

        next();
    } catch (err) {
        console.error('Error processing photo:', err);
        next();
    }
};

module.exports = uploadProjectLogoMiddleware;