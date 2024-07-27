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
    leaveProject
};