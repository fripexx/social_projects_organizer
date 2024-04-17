const ProjectModal = require('../models/project-model')
const ProjectDto = require('../dtos/project-dto');
const ApiError= require('../exceptions/api-error');
const FileService = require("./file-service");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

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

        if(!findProject) throw new ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього');

        if(newLogo) {
            if(findProject.logo instanceof ObjectId) await FileService.deleteImage(findProject.logo);
            const photoData = await FileService.uploadImage(newLogo, user.id, "Project");
            findProject.logo = photoData.id;

            findProject.save();
        }

        await findProject.populate({ path: 'logo', model: 'File'}).lean();

        return new ProjectDto(findProject);
    }
}

module.exports = new ProjectService()