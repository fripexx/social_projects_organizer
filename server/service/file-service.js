const FileModel  = require('../models/file-model');
const FileDto  = require('../dtos/file-dto');
const ApiError = require('../exceptions/api-error')
const fs = require('fs').promises;

class FileService {
    async uploadFile(file, author, id, model) {
        const createFile = await FileModel.create({
            type: file.type,
            extension: file.extension,
            mimetype: file.mimetype,
            dateCreated: Date.now(),
            path: file.path?.original,
            cropped: file.path?.cropped,
            belongTo: {
                id: id,
                model: model
            },
            name: file.name,
            author: author.id,

        })
        const findFile = await FileModel.findById(createFile._id).lean();

        return new FileDto(findFile);
    }

    async deleteFile(id) {
        try {
            const deletedFile = await FileModel.findById(id).lean();

            if(deletedFile) {
                const fileDto = new FileDto(deletedFile);

                const path = fileDto?.path;

                try {
                    if (path) await fs.unlink(path);
                } catch (error) {
                    console.error('Помилка під час видалення файлу:', error);
                }

                const cropped = fileDto?.cropped;
                if (cropped) {
                    await Promise.all(Object.values(cropped).map(async (croppedPath) => {
                        try {
                            if (croppedPath) await fs.unlink(croppedPath);
                        } catch (error) {
                            console.error('Помилка під час видалення файлу:', error);
                        }
                    }));
                }

                await FileModel.deleteOne({_id: fileDto.id})

                return fileDto;
            }

            console.error('Файл з таким ідентифікатором не знайдено');

        } catch (error) {
            console.error('Помилка під час видалення файлу:', error);
            throw ApiError.InternalServerError('Помилка під час видалення файлу');
        }
    }
}

module.exports = new FileService();