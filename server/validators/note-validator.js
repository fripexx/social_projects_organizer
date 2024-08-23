const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');


/**
 * User notes validators
 */

const addNoteUser = [
    body('text')
        .isString().withMessage('text повинен бути строкою')
]

const deleteNoteUser = [
    param('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),
]

const changeNoteUser = [
    body('noteId')
        .isString().withMessage('noteId повинен бути строкою')
        .custom((noteId) => {
            if (!mongoose.Types.ObjectId.isValid(noteId)) throw new Error('noteId повинен бути валідним ObjectId');
            return true;
        }),

    body('text')
        .isString().withMessage('text повинен бути строкою')
]


/**
 * Project notes validators
 */

const getNotesProject = [
    query('id')
        .isString().withMessage('id повинен бути строкою')
        .custom((id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('id повинен бути валідним ObjectId');
            return true;
        }),
];

const addNoteInProject = [
    body('idProject')
        .isString().withMessage('idProject повинен бути строкою')
        .custom((idProject) => {
            if (!mongoose.Types.ObjectId.isValid(idProject)) throw new Error('idProject повинен бути валідним ObjectId');
            return true;
        }),

    body('text')
        .isString().withMessage('text повинен бути строкою')
];

const deleteNoteInProject = [
    query('idNote')
        .isString().withMessage('idNote повинен бути строкою')
        .custom((idNote) => {
            if (!mongoose.Types.ObjectId.isValid(idNote)) throw new Error('idNote повинен бути валідним ObjectId');
            return true;
        }),

    query('idProject')
        .isString().withMessage('idProject повинен бути строкою')
        .custom((idProject) => {
            if (!mongoose.Types.ObjectId.isValid(idProject)) throw new Error('idProject повинен бути валідним ObjectId');
            return true;
        }),
];

const changeNoteInProject = [
    body('idNote')
        .isString().withMessage('idNote повинен бути строкою')
        .custom((idNote) => {
            if (!mongoose.Types.ObjectId.isValid(idNote)) throw new Error('idNote повинен бути валідним ObjectId');
            return true;
        }),

    body('idProject')
        .isString().withMessage('idProject повинен бути строкою')
        .custom((idProject) => {
            if (!mongoose.Types.ObjectId.isValid(idProject)) throw new Error('idProject повинен бути валідним ObjectId');
            return true;
        }),

    body('text')
        .isString().withMessage('text повинен бути строкою')
];

module.exports = {
    getNotesProject,
    addNoteInProject,
    deleteNoteInProject,
    changeNoteInProject,
    addNoteUser,
    deleteNoteUser,
    changeNoteUser
};