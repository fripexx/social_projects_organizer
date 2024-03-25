const ProjectModal = require('../models/project-model')
const ProjectDto = require('../dtos/project-dto');

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
}

module.exports = new ProjectService()