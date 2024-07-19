const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const createInstagramPublication = [
    body('project')
        .isString().withMessage('project повинен бути строкою')
        .custom((project) => {
            if (!mongoose.Types.ObjectId.isValid(project)) throw new Error('project повинен бути валідним ObjectId');
            return true;
        }),

    body('description')
        .isString().withMessage('description повинен бути строкою'),

    body('datePublish')
        .isISO8601().withMessage('datePublish повинен бути датою у форматі ISO8601'),

    body('aspectRatio')
        .isString().withMessage('aspectRatio повинен бути строкою')
        .isIn(['1.91/1', '1/1', '4/5']).withMessage('aspectRatio повинен бути одним з наступних значень: 1.91/1, 1/1, 4/5'),

    body('media')
        .isArray().withMessage('media повинен бути масивом')
        .custom((array) => {
            if (!Array.isArray(array)) throw new Error('media повинен бути масивом');
            for (const id of array) {
                if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Кожен елемент в media повинен бути валідним ObjectId');
            }
            return true;
        })
];

const getInstagramPublication = [
    query('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),

    query('project')
        .isString().withMessage('project повинен бути строкою')
        .custom((project) => {
            if (!mongoose.Types.ObjectId.isValid(project)) throw new Error('project повинен бути валідним ObjectId');
            return true;
        }),
];

const updateInstagramPublication = [
    body('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),

    body('description')
        .isString().withMessage('description повинен бути строкою'),

    body('datePublish')
        .isISO8601().withMessage('datePublish повинен бути датою у форматі ISO8601'),

    body('aspectRatio')
        .isString().withMessage('aspectRatio повинен бути строкою')
        .isIn(['1.91/1', '1/1', '4/5']).withMessage('aspectRatio повинен бути одним з наступних значень: 1.91/1, 1/1, 4/5'),

    body('media')
        .isArray().withMessage('media повинен бути масивом')
        .custom((array) => {
            if (!Array.isArray(array)) throw new Error('media повинен бути масивом');
            for (const id of array) {
                if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Кожен елемент в media повинен бути валідним ObjectId');
            }
            return true;
        })
];

const deletePost = [
    query('id')
        .custom((id) => {
            if (typeof id === 'string') {
                if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            } else if (Array.isArray(id)) {
                id.forEach(item => {
                    if (!mongoose.Types.ObjectId.isValid(item)) throw new Error('Кожен елемент в масиві id повинен бути валідним ObjectId');
                });
            } else {
                throw new Error('id повинен бути або строкою, або масивом строк');
            }
            return true;
        })
];

module.exports = {
    createInstagramPublication,
    getInstagramPublication,
    updateInstagramPublication,
    deletePost
};