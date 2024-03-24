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
        return projects.map(project => {
            const projectDto = new ProjectDto(project);
            projectDto.setPhotoData();
            return projectDto;
        });
    }
}

module.exports = new ProjectService()