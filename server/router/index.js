const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const NoteController = require('../controllers/note-controller')
const ProjectController = require('../controllers/project-controller')
const router = new Router();
const {body} = require('express-validator')
const ApiError = require("../exceptions/api-error");
const uploadAccountMiddleware = require('../middlewares/upload-account-middleware');
const authMiddleware = require('../middlewares/auth-middleware')

/**
 * User routes
 */
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
router.post('/send-activate-link', UserController.sendActivateLink);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.post('/edit-user', [authMiddleware, uploadAccountMiddleware], UserController.editUser);
router.post('/edit-settings-user', [authMiddleware], UserController.editSettingsUser);

/**
 * User notes routes
 */
router.post('/add-note-user', [authMiddleware], NoteController.addNoteUser);
router.delete('/delete-note-user/:id', [authMiddleware], NoteController.deleteNoteUser);
router.patch('/change-note-user', [authMiddleware], NoteController.changeNoteUser);
router.get('/get-notes-user', [authMiddleware], NoteController.getAllUser);

/**
 * Project routes
 */
router.post('/add-project', [authMiddleware], ProjectController.addProject);
router.get('/get-projects', [authMiddleware], ProjectController.getProjects);


module.exports = router;