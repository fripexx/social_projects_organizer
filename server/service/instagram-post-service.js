const ApiError = require("../exceptions/api-error");
const ProjectService = require('../service/project-service');
const InstagramModel = require('../models/instagram-model');
const ProjectModel = require('../models/project-model');
const FileModel = require('../models/file-model');
const InstagramPostDto = require('../dtos/instagram-post-dto');

class InstagramPostService {
    async createInstagramPublication(user, data) {
        const {project, description, aspectRatio, datePublish, media} = data;


        /**
         * Перевірка існувння проєкту
         */
        const findProject = await ProjectModel.findOne({_id: project, 'team.user': user.id}).lean();

        if (!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');


        /**
         * Перевірка ролі юзера
         */
        const teamMember = findProject.team.find(member => member.user.toString() === user.id);

        if (teamMember.role !== 'smm_manager') throw new Error("Помилка: Вашій ролі обмежено доступ до цього запиту.");


        /**
         * Перевірка існування медіафайлів
         */
        const foundMedia = await FileModel.find({_id: {$in: media}}).lean();
        const foundMediaIds = foundMedia.map(project => project._id.toString());

        if (foundMediaIds.length === 0) throw ApiError.BadRequest('Помилка: Не вдалося знайти жодного медіа в базі даних.');


        /**
         * Створення запису в БД
         */
        const createInstagramPublication = await InstagramModel.create({
            project: project,
            status: "edit",
            datePublish: datePublish,
            author: user.id,
            typePost: "publication",
            params: {
                media: media,
                description: description,
                aspectRatio: aspectRatio,
            }
        })

        return new InstagramPostDto(createInstagramPublication);
    }

    async getInstagramPublication(user, query) {
        const {project, id} = query;


        /**
         * Перевірка існувння проєкту
         */
        const findProject = await ProjectModel.findOne({_id: project, 'team.user': user.id}).lean();

        if (!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');


        /**
         * Створення запису в БД
         */
        const instagramPublication = await InstagramModel.findOne({_id: id, typePost: 'publication'});

        if (!instagramPublication) throw ApiError.BadRequest('Помилка: Публікацію з таким ID не знайдено');


        return new InstagramPostDto(instagramPublication);
    }

    async checkUserAccessToPost(id, user, isLean = true, throwError = true, returnProject = false) {

        /**
         * Перевірка існувння посту
         */

        const post = await InstagramModel.findById(id, null, {lean: isLean});

        if(!post) {

            if(throwError) {
                throw ApiError.BadRequest('Помилка: Поста з таким ID не знайдено.');
            } else {
                return false
            }

        }


        /**
         * Перевірка існувння та доступу до проєкту
         */

        const project = await ProjectService.checkUserAccessToProject(post.project, user)


        /**
         * Перевірка доступу юзера
         */

        const teamMember = project.team.find(member => member.user.toString() === user.id);
        const accessRoles = ['smm_manager', 'customer']


        if (!accessRoles.includes(teamMember.role) && project.administrator !== user.id) {

            if(throwError) {
                throw ApiError.BadRequest('Помилка: Вашій ролі обмежено доступ до цього запиту.');
            } else {
                return false
            }

        }

        if(returnProject) {
            return {project, post }
        }

        return post;
    }
}

module.exports = new InstagramPostService();