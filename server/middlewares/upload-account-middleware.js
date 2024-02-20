const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/profile_photos'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Неприпустимий формат файлу'), false);
    }
};

const uploadAccountMiddleware = multer({ storage: storage, fileFilter: fileFilter }).single('photo');

const createCroppedImages = async (file) => {
    const image = sharp(file.path);
    const fileName = file.filename.split(".")[0];
    const fileType = file.filename.split(".")[1];
    const croppedImages = {};

    await Promise.all([
        { size: 300, path: `uploads/profile_photos/${fileName}-300x300.${fileType}` },
        { size: 600, path: `uploads/profile_photos/${fileName}-600x600.${fileType}` },
        { size: 1080, path: `uploads/profile_photos/${fileName}-1080x1080.${fileType}` }
    ].map(async ({ size, path }) => {
        await image.clone().resize(size, size).toFile(path);
        croppedImages[size] = path;
        return path;
    }));

    return croppedImages;
};

module.exports = async (req, res, next) => {
    uploadAccountMiddleware(req, res, async (err) => {
        if (err) return res.status(400).send({ error: err.message });

        if (req.file) {
            try {
                const originalImagePath = req.file.path.replace(/\\/g, '/');
                const croppedImages = await createCroppedImages(req.file);

                req.photo = {
                    ...req.file,
                    path: {
                        original: originalImagePath,
                        cropped: croppedImages,
                    }
                };

                next();
            } catch (error) {
                return res.status(500).send({ error: 'Помилка обробки зображення' });
            }
        } else {
            next();
        }

    });
};
