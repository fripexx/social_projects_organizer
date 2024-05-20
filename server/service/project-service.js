const ProjectModal = require('../models/project-model')
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
    async addProject(name, user) {
        const params = {
            name: name,
            administrator: user.id,
            team: [user.id],
        }

        const project = await ProjectModal.create(params);

        return new ProjectDto(project);
    }
    async getProjects(user) {
        const projects = await ProjectModal.find({ team: user.id }).populate({ path: 'logo', model: 'File'}).populate({ path: 'customer', model: 'User'}).lean();

        return projects.map(project => new ProjectDto(project));
    }
    async getProject(user, id) {
        const findProject = await ProjectModal.findOne({ _id: id, team: user.id }).populate({ path: 'logo', model: 'File'}).lean();

        if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.')

        return new ProjectDto(findProject);
    }
    async editSettingsProject(formData, newLogo, user, ) {
        const {id, logo, ...newData} = formData;

        if(!id) throw ApiError.BadRequest('Відсутнє ID проєкту в запиті')

        const findProject = await ProjectModal.findOneAndUpdate({ _id: id, administrator: user.id }, newData, { new: true });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        if(newLogo) {
            if(findProject.logo instanceof ObjectId) await FileService.deleteFile(findProject.logo);

            const photoData = await FileService.uploadFile(newLogo, user, findProject.id, "Project");
            findProject.logo = photoData.id;

            await findProject.save();
        }

        const returnProject = await ProjectModal.findById(findProject._id).populate({ path: 'logo', model: 'File'}).lean();

        return new ProjectDto(returnProject);
    }
    async getProjectTeam(projectId, user) {
        const findProject = await ProjectModal.findOne({ _id: projectId, team: user.id }).populate({path: "team", model: "User", populate: {path: "photo", model: "File"}}).lean();
        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        return findProject.team.map(teamUser => new UserDto(teamUser, "basic"));
    }
    async sendInviteNewAdmin(projectId, user, newAdmin) {
        const findProject = await ProjectModal.findOne({ _id: projectId, administrator: user.id });
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
        const findProject = await ProjectModal.findOne({ "inviteNewAdmin.key": key });
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

        return new ProjectDto(findProject);
    }
    async removeUserFromTeam(projectId, user, removeUserId) {
        const findProject = await ProjectModal.findOneAndUpdate(
            { _id: projectId, administrator: user.id },
            { $pull: { team: removeUserId } },
            { new: true }
        );

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        return new ProjectDto(findProject);
    }
    async addUserInTeam(projectId, user, email) {
        const findProject = await ProjectModal.findOne({ _id: projectId, administrator: user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const candidate = await UserModel.findOne({email}).lean();

        if(!candidate) throw ApiError.BadRequest('Помилка: Юзера з таким email не знайдено');

        if(findProject.team.includes(candidate._id)) throw ApiError.BadRequest('Помилка: Юзер вже знаходится в команді');

        findProject.team.push(candidate._id);
        await findProject.save();

        return new ProjectDto(findProject);
    }
    async uploadMedia(files, projectId, user) {
        const findProject = await ProjectModal.findOne({ _id: projectId, team: user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const filesData = []

        for (const file of files) {
            const fileData = await FileService.uploadFile(file, user, projectId, "Project");
            filesData.push(fileData);
        }

        return filesData;
    }
    async getMedia(query, user) {
        const {projectId, skip, limit} = query
        const findProject = await ProjectModal.findOne({ _id: projectId, team: user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        const media = await FileModel
            .find({ 'belongTo.id': projectId, 'belongTo.model': 'Project'})
            .skip(skip ? skip : 0)
            .limit(limit ? limit : 10)
            .lean();

        return media.map(item => new FileDto(item));
    }
    async deleteMedia(projectId, user, idMedia) {
        const findProject = await ProjectModal.findOne({ _id: projectId, team: user.id });

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        return await FileService.deleteFile(idMedia);
    }
}

module.exports = new ProjectService()
