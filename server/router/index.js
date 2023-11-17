const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator')
const ApiError = require("../exceptions/api-error");

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').custom((value, { req }) => {
        if (value.length < 8 || value.length > 32) {
            throw ApiError.BadRequest('Пароль повинен бути від 8 до 32 символів');
        }

        if (!/^(?=.*\d)(?=.*[a-zA-Z])/.test(value)) {
            throw ApiError.BadRequest('Пароль повинен містити хоча б одну цифру і латинську букву');
        }

        return true;
    }),
    UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

module.exports = router;