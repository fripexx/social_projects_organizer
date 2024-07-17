const express = require('express');
const path = require('path');
const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");
const ProjectService = require("../service/project-service");
const PostService = require("../service/post-service");
const uploadRouter = express.Router();

uploadRouter.get('/public/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../uploads/public', req.params[0]));
});

uploadRouter.get('/private/chats*', async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        const relativePathFile = req.params[0]
        const chat = relativePathFile.split('/')[1]


        /**
         * Перевірка авторизації
         */

        const userData = await tokenService.validateRefreshToken(refreshToken);

        if(!userData) throw ApiError.UnauthorizedError();


        /**
         * Перевірка прав доступу до проєкту або посту
         */

        const accessProject = await ProjectService.checkUserAccessToProject(chat, userData, true, false);
        const accessPost =  await PostService.checkUserAccessToPost(chat, userData, true, false);

        if(!accessProject && !accessPost) throw ApiError.BadRequest('Користувач немає доступу до файлів цього проєкту')


        /**
         * Надання доступу
         */

        res.sendFile(path.join(__dirname, '../uploads/private/chats', req.params[0]));
    } catch (e) {
        res.json({error: e});
    }
});

uploadRouter.get('/private/media_library*', async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        const relativePathFile = req.params[0]
        const chat = relativePathFile.split('/')[1]


        /**
         * Перевірка авторизації
         */

        const userData = await tokenService.validateRefreshToken(refreshToken);
        if(!userData) throw ApiError.UnauthorizedError();


        /**
         * Перевірка прав доступу до проєкту
         */

        await ProjectService.checkUserAccessToProject(chat, userData);


        /**
         * Надання доступу
         */

        res.sendFile(path.join(__dirname, '../uploads/private/media_library', req.params[0]));
    } catch (e) {
        res.json({error: e});
    }
});

module.exports = uploadRouter;