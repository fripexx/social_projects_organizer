const ProjectService = require('../service/project-service');

class ProjectController {
    async addProject(req, res, next) {
        try {
            const {name} = req.body;
            const user = await req.user;

            const project = await ProjectService.addProject(name, user);

            return res.json(project);
        } catch (e) {
            next(e);
        }
    }
    async getProjects(req, res, next) {
        try {
            const user = await req.user;
            const projects = await ProjectService.getProjects(user);

            return res.json(projects);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProjectController();