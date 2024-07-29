const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const createInstagramPublication = [
    body('project')
        .isString().withMessage('project повинен бути строкою')
        .custom((project) => {
            if (!mongoose.Types.ObjectId.isValid(project)) throw new Error('project повинен бути валідним ObjectId');
            return true;
        }),

    body('datePublish')
        .isISO8601().withMessage('datePublish повинен бути датою у форматі ISO8601'),

    body('params.media')
        .isArray().withMessage('media повинен бути масивом')
        .custom((array) => {
            if (!Array.isArray(array)) throw new Error('media повинен бути масивом');
            for (const id of array) {
                if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Кожен елемент в media повинен бути валідним ObjectId');
            }
            return true;
        }),

    body('params.description')
        .isString().withMessage('description повинен бути строкою'),

    body('params.aspectRatio')
        .isString().withMessage('aspectRatio повинен бути строкою')
        .isIn(['1.91/1', '1/1', '4/5']).withMessage('aspectRatio повинен бути одним з наступних значень: 1.91/1, 1/1, 4/5'),
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

    body('datePublish')
        .isISO8601().withMessage('datePublish повинен бути датою у форматі ISO8601'),

    body('params.media')
        .isArray().withMessage('media повинен бути масивом')
        .custom((array) => {
            if (!Array.isArray(array)) throw new Error('media повинен бути масивом');
            for (const id of array) {
                if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Кожен елемент в media повинен бути валідним ObjectId');
            }
            return true;
        }),

    body('params.description')
        .isString().withMessage('description повинен бути строкою'),

    body('params.aspectRatio')
        .isString().withMessage('aspectRatio повинен бути строкою')
        .isIn(['1.91/1', '1/1', '4/5']).withMessage('aspectRatio повинен бути одним з наступних значень: 1.91/1, 1/1, 4/5'),
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

const sendForConfirmation = [
    body('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),
];

const rejectPost = [
    body('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),
];

const confirmPost = [
    body('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),
];

const getPosts = [
    query('project')
        .isString().withMessage('project повинен бути строкою')
        .custom((project) => {
            if (!mongoose.Types.ObjectId.isValid(project)) throw new Error('project повинен бути валідним ObjectId');
            return true;
        }),

    query('skip')
        .isNumeric().withMessage('skip повинен бути цифрою'),

    query('limit')
        .isNumeric().withMessage('limit повинен бути цифрою'),

    query('social')
        .optional()
        .isString().withMessage('social повинен бути строкою')
        .isIn(['instagram', 'tiktok']).withMessage('social повинен бути одним з наступних значень: instagram, tiktok'),

    query('typePost')
        .optional()
        .isString().withMessage('typePost повинен бути строкою')
        .custom((typePost, { req }) => {
            const { social } = req.query;

            if (social === 'instagram' && !['publication', 'stories', 'reels'].includes(typePost)) {
                throw new Error('typePost для instagram повинен бути одним з наступних значень: publication, stories, reels');
            } else if (social === 'tiktok' && !['publication', 'stories'].includes(typePost)) {
                throw new Error('typePost для tiktok повинен бути одним з наступних значень: publication, stories');
            }

            return true;
        }),

    query('status')
        .optional()
        .isString().withMessage('status повинен бути строкою')
        .isIn(['edit', 'pending', 'rejected', 'confirmed']).withMessage('status повинен бути одним з наступних значень: edit, pending, rejected, confirmed'),
];

module.exports = {
    createInstagramPublication,
    getInstagramPublication,
    updateInstagramPublication,
    deletePost,
    sendForConfirmation,
    rejectPost,
    confirmPost,
    getPosts
};