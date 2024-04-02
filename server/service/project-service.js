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
        const projects = await ProjectModal.find({ team: user.id });
        const replaceProjects = await Promise.all(projects.map(async project => {
            const projectDto = new ProjectDto(project);
            await projectDto.setPhotoData();
            await projectDto.setCustomerData();
            return projectDto;
        }));

        return replaceProjects;
    }
    async getProject(user, id) {
        const findProject = await ProjectModal.findOne({ _id: id, team: user.id });

        if(!findProject) throw ApiError.BadRequest('Проєкту за таким ID не знайдено.')

        const projectDto = new ProjectDto(findProject);
        await projectDto.setPhotoData();
        await projectDto.setCustomerData();

        return projectDto;
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
        }

        findProject.save();

        const projectDto = new ProjectDto(findProject);
        await projectDto.setPhotoData();

        return projectDto;
    }
}

module.exports = new ProjectService()