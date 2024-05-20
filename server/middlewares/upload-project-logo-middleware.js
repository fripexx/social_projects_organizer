const UploadMedia = require("../utils/UploadMedia");

// Middleware для обробки фотографій
const uploadProjectLogoMiddleware = async (req, res, next) => {
    if (!req.files?.logo) return next();

    const file = req.files.logo;
    const uploadDir = `uploads/project_logos`;

    try {
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