const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

// Функція для збереження оригінального файлу
const saveOriginalFile = async (file, uploadDir) => {
    const fileName = `${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = path.join('uploads', 'project_logos', fileName).replace(/\\/g, '/');
    await file.mv(filePath);
    return filePath; // Заміна зворотніх слешів на косі слеші
};

// Функція для кропування та збереження файлу різного розміру
const saveCroppedFile = async (originalFilePath, uploadDir, sizes) => {
    const croppedImages = {};

    for (const size of sizes) {
        const croppedFileName = `${path.basename(originalFilePath, path.extname(originalFilePath))}-${size.width}x${size.height}${path.extname(originalFilePath)}`;
        const croppedFilePath = path.join('uploads', 'project_logos', croppedFileName).replace(/\\/g, '/');

        await sharp(originalFilePath)
            .resize(size.width, size.height)
            .toFile(croppedFilePath);

        croppedImages[`${size.width}`] = croppedFilePath;
    }

    await sharp.cache({files: 0});

    return croppedImages;
};

// Middleware для обробки фотографій
const uploadProjectLogoMiddleware = async (req, res, next) => {
    if (!req.files || !req.files.logo) {
        return next();
    }

    const file = req.files.logo;
    const uploadDir = path.resolve(__dirname, '..', 'uploads', 'project_logos');
    const sizes = [{ width: 300, height: 300 }, { width: 600, height: 600 }, { width: 1080, height: 1080 }];

    try {
        // Зберігання оригінального файлу
        const originalFilePath = await saveOriginalFile(file, uploadDir);

        // Зберігання та отримання шляхів кропнутих файлів
        const croppedImages = await saveCroppedFile(originalFilePath, uploadDir, sizes);

        req.photo = {
            ...file,
            path: {
                original: originalFilePath,
                cropped: croppedImages
            }
        };

        next();
    } catch (err) {
        console.error('Error processing photo:', err);
        next();
    }
};

module.exports = uploadProjectLogoMiddleware;