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

    /**
     * Team handlers
     */
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

    async confirmNewAdministrator(req, res, next, io) {
        try {
            const {key} = req.params;
            const {candidate, project} = await ProjectService.confirmNewAdministrator(key);

            const notification = {
                project: {
                    id: project.id.toString(),
                    name: project.name,
                },
                message: `${candidate.name} новий адміністратор проєкту.`
            }

            io.to(project.id.toString()).emit('teamNotification', notification);

            return res.redirect(`${process.env.CLIENT_URL}/project/${project.id}/teams`);
        } catch (e) {
            next(e);
        }
    }

    async removeUserFromTeam(req, res, next, io) {
        try {
            const user = await req.user;
            const {projectId, removeUserId} = req.body;
            const {candidate, project} = await ProjectService.removeUserFromTeam(projectId, user, removeUserId);

            const notification = {
                project: {
                    id: project.id.toString(),
                    name: project.name,
                },
                message: `${candidate.name} більше не є частиною нашої команди.`
            }

            io.to(project.id.toString()).emit('teamNotification', notification);

            return res.json(project.team);
        } catch (e) {
            next(e);
        }
    }

    async addUserInTeam(req, res, next, io) {
        try {
            const user = await req.user;
            const {projectId, email, role} = req.body;
            const {candidate, project} = await ProjectService.addUserInTeam(projectId, user, email, role);

            const notification = {
                project: {
                    id: project.id.toString(),
                    name: project.name,
                },
                message: `${candidate.name} тепер частина нашої команди. Вітаємо!`,
            }

            io.to(project.id.toString()).emit('teamNotification', notification);

            return res.json(project.team)
        } catch (e) {
            next(e);
        }
    }

    async changeRoleUser(req, res, next, io) {
        try {
            const user = await req.user;
            const {projectId, teamMember, role} = req.body;
            const {candidate, project} = await ProjectService.changeRoleUser(projectId, user, teamMember, role);

            const notification = {
                project: {
                    id: project.id.toString(),
                    name: project.name,
                },
                message: `${candidate.name} тепер має нову роль у команді.`
            }

            io.to(project.id.toString()).emit('teamNotification', notification);

            return res.json(project.team)
        } catch (e) {
            next(e);
        }
    }

    async leaveProject(req, res, next, io) {
        try {
            const user = await req.user;
            const {projectId, leaveUserId} = req.body;
            const {candidate, project} = await ProjectService.leaveProject(projectId, leaveUserId, user);

            const notification = {
                project: {
                    id: project.id.toString(),
                    name: project.name,
                },
                message: `${candidate.name} покинув нашу команду.`
            }

            io.to(project.id.toString()).emit('teamNotification', notification);

            return res.json(project.team)
        } catch (e) {
            next(e);
        }
    }

    /**
     * Media handlers
     */
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