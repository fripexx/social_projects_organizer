const express = require('express');
const path = require('path');
const tokenService = require("../service/token-service");
const ProjectModal = require("../models/project-model");
const ApiError = require("../exceptions/api-error");
const uploadRouter = express.Router();

uploadRouter.get('/public/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../uploads/public', req.params[0]));
});

uploadRouter.get('/private/chats*', async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        const relativePathFile = req.params[0]
        const chat = relativePathFile.split('/')[1]

        const userData = await tokenService.validateRefreshToken(refreshToken);
        if(!userData) throw ApiError.UnauthorizedError();

        const findProject = await ProjectModal.findOne({ _id: chat, team: userData.id }).lean();
        if(!findProject) throw ApiError.BadRequest('Кориистувач немає доступу до файлів цього проєкту')

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

        const userData = await tokenService.validateRefreshToken(refreshToken);
        if(!userData) throw ApiError.UnauthorizedError();

        const findProject = await ProjectModal.findOne({ _id: chat, team: userData.id }).lean();
        if(!findProject) throw ApiError.BadRequest('Кориистувач немає доступу до файлів цього проєкту')

        res.sendFile(path.join(__dirname, '../uploads/private/media_library', req.params[0]));
    } catch (e) {
        res.json({error: e});
    }
});

module.exports = uploadRouter;