const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');


/**
 * Project validators
 */

const addProject = [
    body('name')
        .isString().withMessage('name повинен бути строкою'),
    body('role')
        .isString().withMessage('role повинен бути строкою')
        .isIn(['customer', 'smm_manager', 'target_manager', 'designer']).withMessage('role повинен бути одним з наступних значень: customer, smm_manager, target_manager, designer'),

];

const getProject = [
    query('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),
];

const editSettingsProject = [
    body('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),
    body('name')
        .isString().withMessage('name повинен бути строкою'),

    body('color')
        .isString().withMessage('color повинен бути строкою'),

    body('instagram')
        .isString().withMessage('instagram повинен бути строкою'),

    body('instagramTokenAPI')
        .isString().withMessage('instagramTokenAPI повинен бути строкою'),

    body('facebook')
        .isString().withMessage('facebook повинен бути строкою'),

    body('tiktok')
        .isString().withMessage('tiktok повинен бути строкою'),

    body('linkFigma')
        .isString().withMessage('linkFigma повинен бути строкою'),

    body('linkCanva')
        .isString().withMessage('linkCanva повинен бути строкою'),

];


/**
 * Project media validators
 */

const uploadMedia = [
    body('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),
];

const getMedia = [
    query('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    query('skip')
        .isNumeric().withMessage('skip повинен бути цифрою'),

    query('limit')
        .optional()
        .isNumeric().withMessage('limit повинен бути цифрою'),

    query('type')
        .optional()
        .custom((type, { req }) => {
            // Якщо type є рядком, то нічого не робимо, це допустимо.
            if (typeof type === 'string') {
                return true;
            }

            // Якщо type є масивом, перевіряємо, що всі елементи є рядками.
            if (Array.isArray(type)) {
                const allStrings = type.every(item => typeof item === 'string');
                if (!allStrings) {
                    throw new Error('Кожен елемент у масиві type повинен бути рядком');
                }
                return true;
            }

            // Якщо type ні рядок, ні масив рядків, викликаємо помилку.
            throw new Error('type повинен бути або рядком, або масивом рядків');
        })
];

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

const deleteMedia = [
    query('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    query('idMedia')
        .isString().withMessage('idMedia повинен бути строкою')
        .custom((idMedia) => {
            if (!mongoose.Types.ObjectId.isValid(idMedia)) throw new Error('idMedia повинен бути валідним ObjectId');
            return true;
        }),
];


/**
 * Project team validators
 */

const getProjectTeam = [
    query('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),
];

const sendInviteNewAdmin = [
    body('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    body('newAdministrator')
        .isString().withMessage('newAdministrator повинен бути строкою')
        .custom((newAdmin) => {
            if (!mongoose.Types.ObjectId.isValid(newAdmin)) throw new Error('newAdministrator повинен бути валідним ObjectId');
            return true;
        }),
];

const confirmNewAdministrator = [
    param('key').isString().withMessage('projectId повинен бути строкою')
];

const removeUserFromTeam = [
    body('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    body('removeUserId')
        .isString().withMessage('removeUserId повинен бути строкою')
        .custom((removeUserId) => {
            if (!mongoose.Types.ObjectId.isValid(removeUserId)) throw new Error('removeUserId повинен бути валідним ObjectId');
            return true;
        }),
];

const addUserInTeam = [
    body('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    body('email')
        .isEmail().withMessage('Не валідний email'),

    body('role')
        .isString().withMessage('role повинен бути строкою')
        .isIn(['customer', 'smm_manager', 'target_manager', 'designer']).withMessage('role повинен бути одним з наступних значень: customer, smm_manager, target_manager, designer'),
];

const changeRoleUser = [
    body('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    body('teamMember')
        .isString().withMessage('teamMember повинен бути строкою')
        .custom((teamMember) => {
            if (!mongoose.Types.ObjectId.isValid(teamMember)) throw new Error('teamMember повинен бути валідним ObjectId');
            return true;
        }),

    body('role')
        .isString().withMessage('role повинен бути строкою')
        .isIn(['customer', 'smm_manager', 'target_manager', 'designer']).withMessage('role повинен бути одним з наступних значень: customer, smm_manager, target_manager, designer'),

];

const leaveProject = [
    body('projectId')
        .isString().withMessage('projectId повинен бути строкою')
        .custom((projectId) => {
            if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error('projectId повинен бути валідним ObjectId');
            return true;
        }),

    body('leaveUserId')
        .isString().withMessage('leaveUserId повинен бути строкою')
        .custom((leaveUserId) => {
            if (!mongoose.Types.ObjectId.isValid(leaveUserId)) throw new Error('leaveUserId повинен бути валідним ObjectId');
            return true;
        }),
];

module.exports = {
    getMediaOne,
    getProjectTeam,
    sendInviteNewAdmin,
    confirmNewAdministrator,
    removeUserFromTeam,
    addUserInTeam,
    changeRoleUser,
    leaveProject,
    addProject,
    getProject,
    editSettingsProject,
    uploadMedia,
    getMedia,
    deleteMedia
};