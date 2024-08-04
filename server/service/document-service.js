const DocumentModel = require('../models/document-model')
const ProjectService = require("./project-service");
const FileService = require("./file-service");
const DocumentDto = require("../dtos/document-dto");
const ApiError = require("../exceptions/api-error");

class DocumentService {
    async getDocuments(projectId, user) {


        /**
         * Перевірка доступу до проєкту
         */

        const checkProject = await ProjectService.checkUserAccessToProject(projectId, user);

        if (!checkProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        /**
         * Пошук документів
         */

        const filter = {
            project: checkProject._id
        }
        const options = {
            lean: true,
            populate: {
                path: 'file',
                model: 'File'
            }
        }
        const documents = await DocumentModel.find(filter, null, options);

        return documents.map(document => new DocumentDto(document));
    }

    async setDocument(data, user) {
        const {projectId, name, file} = data;


        /**
         * Перевірка доступу до проєкту
         */

        const checkProject = await ProjectService.checkIsAdmin(projectId, user);

        if (!checkProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або ви не є адміністратором цього проєкту.');


        /**
         * Створення запису документа в БД
         */

        const createDocument = await DocumentModel.create({
            name: name,
            project: checkProject._id,
            dateUpload: new Date(),
        })

        if (!createDocument) throw ApiError.BadRequest('Помилка: Не вдалося створити запис документа в базі даних.');


        /**
         * Збереження файла
         */

        const fileData = await FileService.uploadFile(file, user, createDocument._id, "Document");


        /**
         * Пошук та присвоєння файлу до об'єкту документа
         */

        const options = {
            new: true,
            lean: true,
            populate: {
                path: 'file',
                model: 'File'
            }
        }
        const update = {
            file: fileData.id
        }
        const document = await DocumentModel.findByIdAndUpdate(createDocument._id, update, options)

        if (!document) throw ApiError.BadRequest('Помилка: Не вдалося знайти запис документа в базі даних.');

        return new DocumentDto(document);
    }

    async deleteDocument(id, user) {


        /**
         * Пошук об'єкту документа за ID
         */

        const findDocument = await DocumentModel.findById(id, null, {lean: true});

        if (!findDocument) throw ApiError.BadRequest('Помилка: Документа із вказаним ID не знайдено.');


        /**
         * Перевірка доступу до проєкту
         */

        const checkProject = await ProjectService.checkIsAdmin(findDocument.project, user);

        if (!checkProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або ви не є адміністратором цього проєкту.');


        /**
         * Видалення документу та файлу
         */

        const deleteDocument = await DocumentModel.findByIdAndDelete(findDocument._id);

        if (!deleteDocument) throw ApiError.BadRequest("Помилка: Не вдалося видалити об'єкт документу в БД");

        if (deleteDocument.file) {
            const deleteFile = await FileService.deleteFile(deleteDocument.file);

            if (!deleteFile) throw ApiError.BadRequest("Помилка: Не вдалося видалити файл документа.");
        }


        return deleteDocument._id.toString();
    }
}

module.exports = new DocumentService()
