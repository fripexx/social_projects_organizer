const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const getMediaOne = [
    query('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    query('mediaId')
        .isString().withMessage('mediaId повинен бути строкою')
        .custom((mediaId) => {
            if (!mongoose.Types.ObjectId.isValid(mediaId)) throw new Error('mediaId повинен бути валідним ObjectId');
            return true;
        }),
];

module.exports = {
    getMediaOne,
};