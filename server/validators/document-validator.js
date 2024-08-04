const {body, query} = require('express-validator');
const mongoose = require('mongoose');

/**
 * Project documents
 */

const getDocuments = [
    query('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),
];
const setDocument = [
    body('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    body('name')
        .isString().withMessage('name повинен бути строкою'),
];
const deleteDocument = [
    query('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним id');
            return true;
        }),
];

module.exports = {
    getDocuments,
    setDocument,
    deleteDocument
};