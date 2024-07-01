const ProjectService = require('../service/project-service');
const ApiError = require("../exceptions/api-error");

class ProjectController {
    async addProject(req, res, next) {
        try {
            const {name, role} = req.body;
            const user = await req.user;

            const project = await ProjectService.addProject(name, role, user);

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
            const logo = req?.logo;
            const user = await req.user;

            const project = await ProjectService.editSettingsProject(formData, logo, user);

            return res.json(project);
        } catch (e) {
            next(e);
        }
    }
    async getProjectTeam(req, res, next) {
        try {
            const user = await req.user;
            const {projectId} = req.query;
            const team = await ProjectService.getProjectTeam(projectId, user);

            return res.json(team);
        } catch (e) {
            next(e);
        }
    }
    async sendInviteNewAdmin(req, res, next) {
        try {
            const user = await req.user;
            const {projectId, newAdministrator} = req.body;

            await ProjectService.sendInviteNewAdmin(projectId, user, newAdministrator);

            return res.json();
        } catch (e) {
            next(e);
        }
    }
    async confirmNewAdministrator(req, res, next) {
        try {
            const {key} = req.params;
            const project = await ProjectService.confirmNewAdministrator(key);

            return res.redirect(`${process.env.CLIENT_URL}/project/${project.id}/teams`);
        } catch (e) {
            next(e);
        }
    }
    async removeUserFromTeam(req, res, next) {
        try {
            const user = await req.user;
            const {projectId, removeUserId} = req.body;
            const project = await ProjectService.removeUserFromTeam(projectId, user, removeUserId);

            return res.json(project.team);
        } catch (e) {
            next(e);
        }
    }
    async addUserInTeam(req, res, next) {
        try{
            const user = await req.user;
            const {projectId, email, role} = req.body;
            const project = await ProjectService.addUserInTeam(projectId, user, email, role);

            return res.json(project.team)
        } catch (e) {
            next(e);
        }
    }
    async changeRoleUser(req, res, next) {
        try{
            const user = await req.user;
            const {projectId, teamMember, role} = req.body;
            const project = await ProjectService.changeRoleUser(projectId, user, teamMember, role);

            return res.json(project.team)
        } catch (e) {
            next(e);
        }
    }
    async uploadMedia(req, res, next) {
        try {
            const {projectId} = req.body;
            const files = req?.files;
            const user = await req.user;
            const media = await ProjectService.uploadMedia(files, projectId, user);

            res.json(media);
        } catch (e) {
            next(e);
        }
    }
    async getMedia(req, res, next) {
        try {
            const query = req.query;

            if(!query?.projectId) throw ApiError.BadRequest("Помилка: Не вказано значення параметра 'projectId'. Будь ласка, вкажіть ідентифікатор проекту.");

            const user = await req.user;
            const media = await ProjectService.getMedia(query, user);

            res.json(media);
        } catch (e) {
            next(e);
        }
    }
    async deleteMedia(req, res, next) {
        try {
            const {idMedia, projectId} = req.query;
            const user = await req.user;
            const media = await ProjectService.deleteMedia(projectId, user, idMedia);

            res.json(media);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProjectController();