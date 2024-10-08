const ProjectModel = require('../models/project-model')
const UserModel = require('../models/user-model')
const ProjectDto = require('../dtos/project-dto');
const ApiError= require('../exceptions/api-error');
const FileService = require("./file-service");
const mongoose = require("mongoose");
const UserDto = require("../dtos/user-dto");
const uuid = require('uuid')
const { ObjectId } = mongoose.Types;
const MailService = require("./mail-service");
const FileModel = require("../models/file-model");
const FileDto = require("../dtos/file-dto");

class ProjectService {
    async addProject(name, role, user) {
        const params = {
            name: name,
            administrator: user.id,
            team: [{
                user: user.id,
                role: role
            }],
        }

        const addProject = await ProjectModel.create(params);
        const project = await ProjectModel.findById(addProject._id).lean();

        return new ProjectDto(project);
    }

    async getProjects(user) {
        const projects = await ProjectModel
            .find({ 'team.user': user.id })
            .populate({ path: 'logo', model: 'File'})
            .lean();

        return projects.map(project => new ProjectDto(project));
    }

    async getProject(user, id) {
        const findProject = await ProjectModel
            .findOne({ _id: id, 'team.user': user.id})
            .populate({ path: 'logo', model: 'File'})
            .lean();

        if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.')

        return new ProjectDto(findProject);
    }

    async editSettingsProject(formData, newLogo, user, ) {
        const {id, logo, ...newData} = formData;

        if(!id) throw ApiError.BadRequest('Відсутнє ID проєкту в запиті')

        const findProject = await ProjectModel.findOneAndUpdate({ _id: id, administrator: user.id }, newData, { new: true });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        if(newLogo) {
            if(findProject.logo instanceof ObjectId) await FileService.deleteFile(findProject.logo);

            const photoData = await FileService.uploadFile(newLogo, user, findProject.id, "Project");
            findProject.logo = photoData.id;

            await findProject.save();
        }

        const returnProject = await ProjectModel.findById(findProject._id).populate({ path: 'logo', model: 'File'}).lean();

        return new ProjectDto(returnProject);
    }

    /**
     * Team handlers
     */

    async getProjectTeam(projectId, user) {
        const findProject = await ProjectModel
            .findOne({
                _id: projectId,
                'team.user': user.id
            })
            .populate({
                path: "team.user",
                model: "User",
                populate: {
                    path: "photo",
                    model: "File"
                }
            })
            .lean();

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        return findProject.team.map(item => {
            return {
                role: item.role,
                user: new UserDto(item.user, "basic")
            }
        });
    }

    async sendInviteNewAdmin(projectId, user, newAdmin) {
        const findProject = await ProjectModel.findOne({ _id: projectId, administrator: user.id });
        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const adminCandidate = await UserModel.findById(newAdmin);
        if(!adminCandidate) throw ApiError.BadRequest('Помилка: Юзера з таким ID не знайдено');

        const activationLink = uuid.v4()

        await findProject.set({
            inviteNewAdmin: {
                time: Date.now(),
                key: activationLink,
                candidate: newAdmin
            }
        });
        await findProject.save();
        await MailService.sendAdminRoleInvitation(adminCandidate.email, `${process.env.API_URL}api/confirm-new-administrator/${activationLink}`)
    }

    async confirmNewAdministrator(key) {
        const findProject = await ProjectModel.findOne({ "inviteNewAdmin.key": key });
        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт не знайдено');

        const {time, candidate} = findProject.inviteNewAdmin;
        const day =  24 * 60 * 60 * 1000;
        const pastTime = Date.now() - time;

        if(pastTime > day) throw ApiError.BadRequest('Помилка: Час підтвердження вичерпано. Спробуйте повторити спробу.');

        findProject.administrator = candidate;
        findProject.inviteNewAdmin = {
            time: 0,
            key: null,
            candidate: null
        }
        await findProject.save();

        const candidateData = await UserModel.findById(candidate).lean();

        return {
            candidate: new UserDto(candidateData),
            project: new ProjectDto(findProject)
        };
    }

    async removeUserFromTeam(projectId, user, removeUserId) {
        const findProject = await ProjectModel.findOneAndUpdate(
            {_id: projectId, administrator: user.id},
            {$pull: {team: {user: removeUserId}}},
            {new: true}
        );

        if (!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const candidate = await UserModel.findById(removeUserId).lean();

        return {
            candidate: new UserDto(candidate),
            project: new ProjectDto(findProject)
        };
    }

    async addUserInTeam(projectId, user, email, role) {
        const findProject = await ProjectModel.findOne({ _id: projectId, administrator: user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const candidate = await UserModel.findOne({email}).lean();

        if(!candidate) throw ApiError.BadRequest('Помилка: Юзера з таким email не знайдено');

        if (findProject.team.some(teamMember => teamMember.user.equals(candidate._id))) {
            throw ApiError.BadRequest('Помилка: Юзер вже знаходиться в команді');
        }

        findProject.team.push({ user: candidate._id, role });

        await findProject.save();

        return {
            candidate: new UserDto(candidate),
            project: new ProjectDto(findProject)
        };
    }

    async changeRoleUser(projectId, user, teamMember, role) {
        const findProject = await ProjectModel.findOneAndUpdate(
            {
                _id: projectId,
                administrator: user.id,
                'team.user': teamMember
            },
            {
                $set: {
                    'team.$.role': role
                }
            },
            {
                new: true,
                lean: true
            }
        );

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const candidate = await UserModel.findById(teamMember).lean();

        return {
            candidate: new UserDto(candidate),
            project: new ProjectDto(findProject)
        };
    }

    async leaveProject(projectId, leaveUserId, user) {
        if(leaveUserId !== user.id) throw ApiError.BadRequest('Ідентифікатор юзера повинен співпадати з ідентифікатором юзера який надсилає запит.');

        const findProject = await ProjectModel.findOne({ _id: projectId, 'team.user': leaveUserId });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        if(findProject.administrator.toString() === leaveUserId) throw ApiError.BadRequest('Помилка: Адміністратор не може покинути проєкт.');

        findProject.team = findProject.team.filter(teamMember => teamMember.user.toString() !== leaveUserId);

        await findProject.save();

        const candidate = await UserModel.findById(leaveUserId).lean();

        return {
            candidate: new UserDto(candidate),
            project: new ProjectDto(findProject)
        };
    }

    /**
     * Media handlers
     */

    async uploadMedia(files, projectId, user) {
        const findProject = await ProjectModel.findOne({ _id: projectId, 'team.user': user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const filesData = []

        for (const file of files) {
            const fileData = await FileService.uploadFile(file, user, projectId, "Project");
            filesData.push(fileData);
        }

        return filesData;
    }

    async getMedia(query, user) {
        const {projectId, skip, limit, type, mediaIds} = query
        const findProject = await ProjectModel.findOne({ _id: projectId, 'team.user': user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const filter = {
            'belongTo.id': projectId,
            'belongTo.model': 'Project'
        }

        if (type && Array.isArray(type)) {
            filter['type'] = { $in: type };
        } else if (type && typeof type === 'string') {
            filter['type'] = type;
        }

        if (mediaIds && Array.isArray(mediaIds)) {
            filter['_id'] = { $in: mediaIds };
        } else if (mediaIds && typeof mediaIds === 'string') {
            filter['_id'] = mediaIds;
        }

        const totalMediaCount = await FileModel.countDocuments(filter);

        const options = {
            sort: { dateCreated: -1 },
            skip: skip ? skip : 0,
            limit: limit ? limit : 10,
            lean: true
        };

        const media = await FileModel.find(filter, null, options);

        return {
            total: totalMediaCount,
            media: media.map(item => new FileDto(item))
        };
    }

    async getMediaOne(query, user) {
        const {projectId, mediaId} = query

        const checkProject = await this.checkUserAccessToProject(projectId, user)

        const filter = {
            _id: mediaId,
            'belongTo.id': checkProject._id,
            'belongTo.model': 'Project'
        }
        const options = {
            lean: true
        }
        const media = await FileModel.findOne(filter, null, options);

        if(!media) throw ApiError.BadRequest('Помилка: Медіа із вказаним ID не знайдено');

        return new FileDto(media);
    }

    async deleteMedia(projectId, user, idMedia) {
        const findProject = await ProjectModel.findOne({ _id: projectId, 'team.user': user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        return await FileService.deleteFile(idMedia);
    }


    /**
     * Допоміжні функції
     */

    async checkUserAccessToProject(projectId, user, isLean = true, throwError = true) {
        const findProject = await ProjectModel.findOne({ _id: projectId, 'team.user': user.id }, null, {lean: isLean} )

        if(!findProject) {

            if(throwError) {
                throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');
            } else {
                return false
            }

        }

        return findProject;
    }

    async checkProjectManagementPermissions(project, user, isLean = true, throwError = true) {


        /**
         * Перевірка існувння та доступу до проєкту
         */

        const checkProject = await this.checkUserAccessToProject(project, user, isLean, throwError)


        /**
         * Перевірка доступу юзера
         */

        const teamMember = checkProject.team.find(member => member.user.toString() === user.id);
        const accessRoles = ['smm_manager']


        if (!accessRoles.includes(teamMember.role)) {

            if(throwError) {
                throw ApiError.BadRequest('Помилка: Вашій ролі обмежено доступ до цього запиту.');
            } else {
                return false
            }

        }

        return checkProject;
    }

    async checkProjectAdministrationPermissions(project, user, isLean = true, throwError = true) {


        /**
         * Перевірка існувння та доступу до проєкту
         */

        const checkProject = await this.checkUserAccessToProject(project, user, isLean, throwError)


        /**
         * Перевірка доступу юзера
         */

        const teamMember = checkProject.team.find(member => member.user.toString() === user.id);
        const accessRoles = ['customer']


        if (!accessRoles.includes(teamMember.role)) {

            if(throwError) {
                throw ApiError.BadRequest('Помилка: Вашій ролі обмежено доступ до цього запиту.');
            } else {
                return false
            }

        }

        return checkProject;
    }

    async checkIsAdmin(projectId, user, lean = false, throwError = true) {
        const findProject = await ProjectModel.findOne({ _id: projectId, administrator: user.id }, null, {lean} )

        if(!findProject) {

            if(throwError) {
                throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');
            } else {
                return false
            }

        }

        return findProject;
    }
}

module.exports = new ProjectService()
