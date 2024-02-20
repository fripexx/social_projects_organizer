const FileModel  = require('../models/file-model');
const FileDto  = require('../dtos/file-dto');
const ApiError = require('../exceptions/api-error')
const fs = require('fs').promises; // Завантаження модуля fs для роботи з файлами (використовуємо версію з підтримкою обіцянок)
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

class FileService {
    async uploadImage(file, id, model) {
        const data = await FileModel.create({
            type: "image",
            mimetype: file.mimetype,
            dateCreated: Date.now(),
            path: file.path?.original,
            cropped: file.path?.cropped,
            belongTo: {
                id: id,
                model: model
            }

        })

        const fileDto = new FileDto(data);
        return fileDto;
    }

    async deleteImage(id) {
        try {
            const deletedFile = await FileModel.findById(id);

            if (!deletedFile) throw ApiError.NotFound('Файл з таким ідентифікатором не знайдено');

            const fileDto = new FileDto(deletedFile);

            const path = fileDto.path;
            if(path) await fs.unlink(path);

            const cropped = fileDto?.cropped;
            if(cropped) {
                for (const key in cropped) {
                    if (cropped.hasOwnProperty(key)) await fs.unlink(cropped[key]);
                }
            }

            await FileModel.deleteOne({_id: fileDto.id})

            return fileDto;
        } catch (error) {
            console.error('Помилка під час видалення файлу:', error);
            throw ApiError.InternalServerError('Помилка під час видалення файлу');
        }
    }
}

module.exports = new FileService();