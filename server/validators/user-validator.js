const { body, param, query } = require('express-validator');
const ApiError = require("../exceptions/api-error");

const customPasswordValidate = (value) => {
    if (value.length < 8 || value.length > 32) {
        throw ApiError.BadRequest('Пароль повинен бути від 8 до 32 символів');
    }

    if (!/^(?=.*\d)(?=.*[a-zA-Z])/.test(value)) {
        throw ApiError.BadRequest('Пароль повинен містити хоча б одну цифру і латинську букву');
    }

    return true;
}

/**
 * Project validators
 */

const registration = [
    body('name')
        .isString().withMessage('name повинен бути строкою'),

    body('surname')
        .isString().withMessage('surname повинен бути строкою'),

    body('email')
        .isEmail().withMessage('email повинен бути валідною поштою'),

    body('phone')
        .isMobilePhone("uk-UA").withMessage('phone повинен бути валідним номером телефону'),

    body('password')
        .isString().withMessage('password повинен бути строкою')
        .custom((value, {req}) => customPasswordValidate(value)),
];

const login = [
    body('email')
        .isEmail().withMessage('email повинен бути валідною поштою'),

    body('password')
        .isString().withMessage('password повинен бути строкою')
        .custom((value, {req}) => customPasswordValidate(value)),
];

const sendActivateLink = [
    body('email')
        .isEmail().withMessage('email повинен бути валідною поштою'),
];

const activate = [
    param('link')
        .isString().withMessage('link повинен бути строкою'),
];

const editUser = [
    body('name')
        .isString().withMessage('name повинен бути строкою'),

    body('surname')
        .isString().withMessage('surname повинен бути строкою'),

    body('email')
        .isEmail().withMessage('email повинен бути валідною поштою'),

    body('phone')
        .isMobilePhone("uk-UA").withMessage('phone повинен бути валідним номером телефону'),

    body('telegram')
        .isString().withMessage('telegram повинен бути строкою'),
];

const editSettings = [
    body('darkMode')
        .isBoolean().withMessage('darkMode повинен бути булевим значенням'),

    body('pushNotifications')
        .isBoolean().withMessage('darkMode повинен бути булевим значенням'),
];


module.exports = {
    registration,
    login,
    sendActivateLink,
    activate,
    editUser,
    editSettings
};