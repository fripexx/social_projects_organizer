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
    async getProject(req, res, next) {
        try {
            const {id} = req.query;
            const user = await req.user;
            const projects = await ProjectService.getProject(user, id);

            return res.json(projects);
        } catch (e) {
            next(e);
        }
    }
    async editSettingsProject(req, res, next) {
        try {
            const formData = req.body;
            const photo = req?.photo;
            const user = await req.user;

            const project = await ProjectService.editSettingsProject(formData, photo, user);

            return res.json(project);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProjectController();