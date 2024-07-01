const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const NoteController = require('../controllers/note-controller')
const ProjectController = require('../controllers/project-controller')
const ChatController = require('../controllers/chat-controller')
const InstagramPostsController = require('../controllers/instagram-posts-controller')
const ApiError = require("../exceptions/api-error");
const uploadUserMiddleware = require('../middlewares/upload-user-middleware');
const uploadProjectLogoMiddleware = require('../middlewares/upload-project-logo-middleware');
const uploadMediaLibraryMiddleware = require('../middlewares/upload-media-library-middleware');
const uploadChatMiddleware = require('../middlewares/upload-chat-middleware');
const authMiddleware = require('../middlewares/auth-middleware')
const {body} = require('express-validator')

const setupRouter = ({io}) => {
    const router = new Router();

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
    router.post('/edit-user', [authMiddleware, uploadUserMiddleware], UserController.editUser);
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
    router.get('/get-project', [authMiddleware], ProjectController.getProject);
    router.put('/edit-settings-project', [authMiddleware, uploadProjectLogoMiddleware], ProjectController.editSettingsProject);
    router.get('/get-project-team', [authMiddleware], ProjectController.getProjectTeam);
    router.patch('/change-project-administrator', [authMiddleware], ProjectController.sendInviteNewAdmin);
    router.get('/confirm-new-administrator/:key', ProjectController.confirmNewAdministrator);
    router.patch('/remove-user-from-team', [authMiddleware], ProjectController.removeUserFromTeam);
    router.patch('/add-user-in-team', [authMiddleware], ProjectController.addUserInTeam);
    router.patch('/change-role-user', [authMiddleware], ProjectController.changeRoleUser);
    router.patch('/leave-project', [authMiddleware], ProjectController.leaveProject);

    /**
     * Project notes routes
     */
    router.get('/get-notes-project', [authMiddleware], NoteController.getAllProject);
    router.post('/add-note-in-project', [authMiddleware], NoteController.addNoteInProject);
    router.delete('/delete-note-in-project', [authMiddleware], NoteController.deleteNoteInProject);
    router.patch('/change-note-in-project', [authMiddleware], NoteController.changeNoteInProject);


    /**
     * Project media routes
     */
    router.post('/upload-media', [authMiddleware, uploadMediaLibraryMiddleware], ProjectController.uploadMedia);
    router.get('/get-media', [authMiddleware, uploadMediaLibraryMiddleware], ProjectController.getMedia);
    router.delete('/delete-media', [authMiddleware, uploadMediaLibraryMiddleware], ProjectController.deleteMedia);


    /**
     * Project chat routes
     */
    router.post('/send-message', [authMiddleware, uploadChatMiddleware], (req, res, next) => {
        ChatController.sendMessage(req, res, next, io);
    });


    /**
     * InstagramPosts
     */
    router.post('/add-instagram-post', [authMiddleware], InstagramPostsController.addInstagramPosts);

    return router;
};

module.exports = setupRouter;