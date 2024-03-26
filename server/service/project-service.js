const ProjectModal = require('../models/project-model')
const ProjectDto = require('../dtos/project-dto');
const ApiError= require('../exceptions/api-error');

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
}

module.exports = new ProjectService()