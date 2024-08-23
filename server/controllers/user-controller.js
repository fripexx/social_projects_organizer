const UserService = require('../service/user-service')
const FileService = require('../service/file-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) return next(ApiError.BadRequest("Помилка валідації", errors.array()))

            const {email, password, name, surname, phone} = req.body;
            const userData = await UserService.registration(email, password, name, surname, phone)

            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*100, httpOnly: true, /* secure: true */ })

            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async sendActivateLink(req, res, next) {
        try {
            const {email} = req.body;

            await UserService.sendActivateLink(email);

            return res.json();
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token  = await UserService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json();
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;

            await UserService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*100, httpOnly: true, /* secure: true */ })

            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async editUser(req, res, next) {
        try {
            const photo = req?.photo;
            const user = await req.user;
            const editData = req.body;
            const data = await UserService.editUser(user, {...editData, photo});

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async editSettingsUser(req, res, next) {
        try {
            const {darkMode, pushNotifications} = req.body;
            const user = await req.user;
            const data = await UserService.editSettingsUser(user, {darkMode, pushNotifications});

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();