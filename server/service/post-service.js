const ApiError = require("../exceptions/api-error");
const ProjectService = require('../service/project-service');
const ChatService = require('../service/chat-service');
const PostModel = require('../models/post-model');
const ProjectModel = require('../models/project-model');
const FileModel = require('../models/file-model');
const PostDto = require('../dtos/post-dto');
const ProjectDto = require('../dtos/project-dto');

class PostService {


    /**
     * Publication
     */

    async createInstagramPublication(user, data) {
        const {project, datePublish, params} = data;
        const {aspectRatio, description, media} = params;


        /**
         * Перевірка прав в проєкті
         */

        const checkProject = await ProjectService.checkProjectManagementPermissions(project, user, true)


        /**
         * Перевірка існування медіафайлів
         */

        const filterMedia = {
            _id: {$in: media},
            'belongTo.id': project,
            'belongTo.model': "Project"

        }
        const foundMedia = await FileModel.find(filterMedia, null, {lean: true});
        const foundMediaIds = foundMedia.map(item => item._id.toString());

        if (foundMediaIds.length === 0) throw ApiError.BadRequest('Помилка: Не вдалося знайти жодного медіа.');


        /**
         * Створення запису в БД
         */

        const createInstagramPublication = await PostModel.create({
            project: checkProject._id,
            status: "edit",
            datePublish: datePublish,
            author: user.id,
            social: "instagram",
            typePost: "publication",
            params: {
                media: media,
                description: description,
                aspectRatio: aspectRatio,
            }
        })

        return new PostDto(createInstagramPublication);
    }

    async getInstagramPublication(user, query) {
        const {project, id} = query;


        /**
         * Перевірка існувння проєкту
         */

        const findProject = await ProjectModel.findOne({_id: project, 'team.user': user.id}).lean();

        if (!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');


        /**
         * Пошук публікації в БД
         */

        const instagramPublication = await PostModel.findOne({_id: id, typePost: 'publication'});

        if (!instagramPublication) throw ApiError.BadRequest('Помилка: Публікацію з таким ID не знайдено');

        return new PostDto(instagramPublication);
    }

    async updateInstagramPublication(user, data) {
        const {id, project, datePublish, params} = data;
        const {aspectRatio, description, media} = params;


        /**
         * Перевірка прав в проєкті
         */

        const checkProject = await ProjectService.checkProjectManagementPermissions(project, user, true)


        /**
         * Перевірка існувння та доступуп до посту
         */

        const checkPublication = await this.checkPostManagementPermissions(id, user);


        /**
         * Пошук та оновлення публікації
         */

        const update = {
            status: "edit",
            datePublish,
            params: {
                description,
                aspectRatio,
                media
            }
        }
        const options = {
            lean: true,
            new: true
        }
        const updatePublication = await PostModel.findByIdAndUpdate(checkPublication._id, update, options)

        if(!updatePublication) throw ApiError.BadRequest('Помилка: Невдалося оновити публікацію.');

        return new PostDto(updatePublication);
    }


    /**
     * Reels
     */

    async createInstagramReels(user, data) {
        const {project, datePublish, params} = data;
        const {description, media} = params;


        /**
         * Перевірка прав в проєкті
         */

        const checkProject = await ProjectService.checkProjectManagementPermissions(project, user, true)


        /**
         * Перевірка існування медіафайлів
         */

        const filterMedia = {
            _id: {$in: media},
            'belongTo.id': project,
            'belongTo.model': "Project"

        }
        const foundMedia = await FileModel.find(filterMedia, null, {lean: true});
        const foundMediaIds = foundMedia.map(item => item._id.toString());

        if (foundMediaIds.length === 0) throw ApiError.BadRequest('Помилка: Не вдалося знайти жодного медіа.');


        /**
         * Створення запису в БД
         */

        const createInstagramPublication = await PostModel.create({
            project: checkProject._id,
            status: "edit",
            datePublish: datePublish,
            author: user.id,
            social: "instagram",
            typePost: "reels",
            params: {
                media: media,
                description: description,
            }
        })

        return new PostDto(createInstagramPublication);
    }

    async getInstagramReels(user, query) {
        const {project, id} = query;


        /**
         * Перевірка існувння проєкту
         */

        const findProject = await ProjectModel.findOne({_id: project, 'team.user': user.id}).lean();

        if (!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');


        /**
         * Пошук поста в БД
         */

        const post = await PostModel.findOne({_id: id, typePost: 'reels'});

        if (!post) throw ApiError.BadRequest('Помилка: Поста з таким ID не знайдено');

        return new PostDto(post);
    }

    async updateInstagramReels(user, data) {
        const {id, project, datePublish, params} = data;
        const {description, media} = params;


        /**
         * Перевірка прав в проєкті
         */

        const checkProject = await ProjectService.checkProjectManagementPermissions(project, user, true)


        /**
         * Перевірка існувння та доступуп до посту
         */

        const checkPublication = await this.checkPostManagementPermissions(id, user);


        /**
         * Пошук та оновлення поста
         */

        const update = {
            status: "edit",
            datePublish,
            params: {
                description,
                media
            }
        }
        const options = {
            lean: true,
            new: true
        }
        const updatePost = await PostModel.findByIdAndUpdate(checkPublication._id, update, options)

        if(!updatePost) throw ApiError.BadRequest('Помилка: Невдалося оновити пост.');

        return new PostDto(updatePost);
    }


    /**
     * Stories
     */

    async createInstagramStories(user, data) {
        const {project, datePublish, params} = data;
        const {media} = params;


        /**
         * Перевірка прав в проєкті
         */

        const checkProject = await ProjectService.checkProjectManagementPermissions(project, user, true)


        /**
         * Перевірка існування медіафайлів
         */

        const filterMedia = {
            _id: {$in: media},
            'belongTo.id': project,
            'belongTo.model': "Project"

        }
        const foundMedia = await FileModel.find(filterMedia, null, {lean: true});
        const foundMediaIds = foundMedia.map(item => item._id.toString());

        if (foundMediaIds.length === 0) throw ApiError.BadRequest('Помилка: Не вдалося знайти жодного медіа.');


        /**
         * Створення запису в БД
         */

        const createInstagramPublication = await PostModel.create({
            project: checkProject._id,
            status: "edit",
            datePublish: datePublish,
            author: user.id,
            social: "instagram",
            typePost: "stories",
            params: {
                media: media,
            }
        })

        return new PostDto(createInstagramPublication);
    }

    async getInstagramStories(user, query) {
        const {project, id} = query;


        /**
         * Перевірка існувння проєкту
         */

        const findProject = await ProjectModel.findOne({_id: project, 'team.user': user.id}).lean();

        if (!findProject) throw ApiError.BadRequest('Помилка: Пост із вказаним ID не знайдено або у вас немає прав доступу до нього');


        /**
         * Пошук поста в БД
         */

        const post = await PostModel.findOne({_id: id, typePost: 'stories'});

        if (!post) throw ApiError.BadRequest('Помилка: Пост з таким ID не знайдено');

        return new PostDto(post);
    }

    async updateInstagramStories(user, data) {
        const {id, project, datePublish, params} = data;
        const {media} = params;


        /**
         * Перевірка прав в проєкті
         */

        const checkProject = await ProjectService.checkProjectManagementPermissions(project, user, true)


        /**
         * Перевірка існувння та доступуп до посту
         */

        const checkPublication = await this.checkPostManagementPermissions(id, user);


        /**
         * Пошук та оновлення поста
         */

        const update = {
            status: "edit",
            datePublish,
            params: {media}
        }
        const options = {
            lean: true,
            new: true
        }
        const updatePost = await PostModel.findByIdAndUpdate(checkPublication._id, update, options)

        if(!updatePost) throw ApiError.BadRequest('Помилка: Невдалося оновити пост.');

        return new PostDto(updatePost);
    }


    /**
     * General
     */

    async deletePost(user, query) {
        const {id} = query;


        /* Видалення масиву постів */

        if(Array.isArray(id)) {
            const deletePosts = [];

            for (let i = 0; i < id.length; i++) {
                const currentId = id[i];

                if(typeof currentId === "string") {


                    /**
                     * Перевірка прав редагування посту
                     */

                    const post = await this.checkPostManagementPermissions(id, user, true);


                    /**
                     * Пошук та видалення посту
                     */

                    const deletePost = await PostModel.findByIdAndDelete(post._id);

                    if(!deletePost) throw ApiError.BadRequest('Помилка: Невдалося видалити пост.');

                    deletePosts.push(deletePost._id);
                }

                throw ApiError.BadRequest('Помилка: ID повинно бути строкою.');
            }

            return deletePosts;
        }


        /* Видалення одного поста */

        /**
         * Перевірка прав редагування посту
         */

        const post = await this.checkPostManagementPermissions(id, user, true);


        /**
         * Пошук та видалення посту
         */

        const deletePost = await PostModel.findByIdAndDelete(post._id);

        if(!deletePost) throw ApiError.BadRequest('Помилка: Невдалося видалити пост.');

        const postMessages = await ChatService.getMessages(post._id);
        const deletedMessages = await ChatService.deleteMessage(postMessages.map(message => message.id.toString()))

        return deletePost._id;
    }

    async sendForConfirmation(user, id) {


        /**
         * Перевірка прав на редагування посту
         */

        const checkPost = await this.checkPostManagementPermissions(id, user);


        /**
         * Перевірка статусу поста
         */

        const acceptStatus = ["edit", "rejected"];

        if (!acceptStatus.includes(checkPost.status)) throw ApiError.BadRequest('Помилка: Відправити на підтвердження можна тільки пости зі статусами edit або rejected.')


        /**
         * Оновлення статусу поста
         */

        const updatePost = await PostModel.findByIdAndUpdate(checkPost._id, {status: 'pending'}, {lean: true, new: true});


        /**
         * Отримання данних проєкту
         */

        const project = await ProjectModel.findById(updatePost.project)

        return {
            post: new PostDto(updatePost),
            project: new ProjectDto(project),
        };
    }

    async rejectPost(user, id) {


        /**
         * Перевірка існування поста
         */

        const post = await PostModel.findById(id, null);

        if (!post) throw ApiError.BadRequest('Помилка: Поста з таким ID не знайдено')


        /**
         * Перевірка прав на адміністрування постів
         */

        const checkProject = await ProjectService.checkProjectAdministrationPermissions(post.project, user);


        /**
         * Перевірка статусу поста
         */

        const acceptStatus = ["pending", "confirmed"];

        if (!acceptStatus.includes(post.status)) throw ApiError.BadRequest('Помилка: Відправити на підтвердження можна тільки пости зі статусами edit або rejected.')


        /**
         * Оновлення статусу поста
         */

        post.status = 'rejected';

        await post.save()

        return {
            post: new PostDto(post),
            project: new ProjectDto(checkProject),
        };
    }

    async confirmPost(user, id) {


        /**
         * Перевірка існування поста
         */

        const post = await PostModel.findById(id, null);

        if (!post) throw ApiError.BadRequest('Помилка: Поста з таким ID не знайдено')


        /**
         * Перевірка прав на адміністрування постів
         */

        const checkProject = await ProjectService.checkProjectAdministrationPermissions(post.project, user);


        /**
         * Перевірка статусу поста
         */

        const acceptStatus = ["pending", "rejected"];

        if (!acceptStatus.includes(post.status)) throw ApiError.BadRequest('Помилка: Відправити на підтвердження можна тільки пости зі статусами edit або rejected.')


        /**
         * Оновлення статусу поста
         */

        post.status = 'confirmed';

        await post.save()

        return {
            post: new PostDto(post),
            project: new ProjectDto(checkProject),
        };
    }

    async getPosts(user, query) {
        const {project, skip, limit, social, typePost, status} = query;

        const filter = {
            project,
        }

        if(social) {
            if (["instagram", "tiktok"].includes(social)) {
                filter["social"] = social;
            } else {
                throw ApiError.BadRequest('Помилка: social повинен бути одним з наступних значень: instagram, tiktok.');
            }
        }

        if(typePost) {
            if (["instagram", "tiktok"].includes(filter["social"])) {
                switch (filter["social"]) {
                    case "instagram":
                        if (["publication", "stories", "reels"].includes(typePost)) {
                            filter["typePost"] = typePost;
                        } else {
                            throw ApiError.BadRequest('Помилка: typePost для instagram повинен бути одним з наступних значень: publication, stories, reels');
                        }
                        break;

                    case "tiktok":
                        if (["publication", "stories"].includes(typePost)) {
                            filter["typePost"] = typePost;
                        } else {
                            throw ApiError.BadRequest('Помилка: typePost для tiktok повинен бути одним з наступних значень: publication, stories');
                        }
                        break;
                }
            }
        }

        if (status) {
            if (['edit', 'pending', 'rejected', 'confirmed'].includes(status)) {
                filter["status"] = status;
            } else {
                throw ApiError.BadRequest('Помилка: status повинен бути одним з наступних значень: edit, pending, rejected, confirmed.');
            }
        }

        const options = {
            skip,
            limit,
            lean: true
        }

        const posts = await PostModel.find(filter, null, options);
        const totalPosts = await PostModel.countDocuments(filter);

        return {
            posts: posts.map(post => new PostDto(post)),
            total: totalPosts,
        };
    }

    async checkUserAccessToPost(id, user, isLean = true, throwError = true, returnProject = false) {


        /**
         * Перевірка існувння посту
         */

        const post = await PostModel.findById(id, null, {lean: isLean});

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


        if(returnProject) return {project, post}

        return post;
    }

    async checkPostManagementPermissions(id, user, throwError = true) {


        /**
         * Перевірка існувння посту
         */

        const post = await PostModel.findById(id, null, {lean: true});

        if(post.author.toString() !== user.id.toString()) {

            if(throwError) {
                throw ApiError.BadRequest('Помилка: Ви не маєте прав на редагування цього посту');
            } else {
                return false
            }

        }

        return post;
    }

}

module.exports = new PostService();