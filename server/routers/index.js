const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const NoteController = require('../controllers/note-controller')
const ProjectController = require('../controllers/project-controller')
const ProjectValidator = require('../validators/project-validator')
const ChatController = require('../controllers/chat-controller')
const PostController = require('../controllers/post-controller')
const PostValidator = require('../validators/post-validator')
const ApiError = require("../exceptions/api-error");
const {body, validationResult} = require('express-validator')
const uploadUserMiddleware = require('../middlewares/upload-user-middleware');
const uploadProjectLogoMiddleware = require('../middlewares/upload-project-logo-middleware');
const uploadMediaLibraryMiddleware = require('../middlewares/upload-media-library-middleware');
const uploadChatMiddleware = require('../middlewares/upload-chat-middleware');
const authMiddleware = require('../middlewares/auth-middleware')

const setupRouter = ({io}) => {
    const router = new Router();

    const validate = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    };

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

    /**
     * Project team routes
     */
    router.get(
        '/get-project-team',
        [authMiddleware, ...ProjectValidator.getProjectTeam, validate],
        ProjectController.getProjectTeam
    );
    router.patch(
        '/change-project-administrator',
        [authMiddleware, ...ProjectValidator.sendInviteNewAdmin, validate],
        ProjectController.sendInviteNewAdmin
    );
    router.get('/confirm-new-administrator/:key',
        [...ProjectValidator.confirmNewAdministrator, validate],
        async (req, res, next) => {
            await ProjectController.confirmNewAdministrator(req, res, next, io);
        }
    );
    router.patch('/remove-user-from-team',
        [authMiddleware, ...ProjectValidator.removeUserFromTeam, validate],
        async (req, res, next) => {
            await ProjectController.removeUserFromTeam(req, res, next, io);
        }
    );
    router.patch('/add-user-in-team',
        [authMiddleware, ...ProjectValidator.addUserInTeam, validate],
        async (req, res, next) => {
            await ProjectController.addUserInTeam(req, res, next, io);
        }
    );
    router.patch('/change-role-user',
        [authMiddleware, ...ProjectValidator.changeRoleUser, validate],
        async (req, res, next) => {
            await ProjectController.changeRoleUser(req, res, next, io);
        }
    );
    router.patch('/leave-project',
        [authMiddleware, ...ProjectValidator.leaveProject, validate],
        async (req, res, next) => {
            await ProjectController.leaveProject(req, res, next, io);
        }
    );

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
    router.get('/get-media', [authMiddleware], ProjectController.getMedia);
    router.get(
        '/get-media-one',
        [authMiddleware, ...ProjectValidator.getMediaOne, validate],
        ProjectController.getMediaOne
    );
    router.delete('/delete-media', [authMiddleware], ProjectController.deleteMedia);


    /**
     * Project chat routes
     */
    router.post('/send-message', [authMiddleware, uploadChatMiddleware], async (req, res, next) => {
        await ChatController.sendMessage(req, res, next, io);
    });


    /**
     * Posts
     */

    // General

    router.delete(
        '/delete-post',
        [authMiddleware, ...PostValidator.deletePost, validate],
        PostController.deletePost
    );
    router.patch(
        '/send-for-confirmation',
        [authMiddleware, ...PostValidator.sendForConfirmation, validate],
        async (req, res, next) => {
            await PostController.sendForConfirmation(req, res, next, io);
        }
    );
    router.patch(
        '/reject-post',
        [authMiddleware, ...PostValidator.rejectPost, validate],
        async (req, res, next) => {
            await PostController.rejectPost(req, res, next, io);
        }
    );
    router.patch(
        '/confirm-post',
        [authMiddleware, ...PostValidator.confirmPost, validate],
        async (req, res, next) => {
            await PostController.confirmPost(req, res, next, io);
        }
    );
    router.get(
        '/get-posts',
        [authMiddleware, ...PostValidator.getPosts, validate],
        PostController.getPosts
    );


    // Publication

    router.post(
        '/create-instagram-publication',
        [authMiddleware, ...PostValidator.createInstagramPublication, validate],
        PostController.createInstagramPublication
    );
    router.get(
        '/get-instagram-publication',
        [authMiddleware, ...PostValidator.getInstagramPublication, validate],
        PostController.getInstagramPublication
    );
    router.patch(
        '/update-instagram-publication',
        [authMiddleware, ...PostValidator.updateInstagramPublication, validate],
        PostController.updateInstagramPublication
    );


    // Reels

    router.post(
        '/create-instagram-reels',
        [authMiddleware, ...PostValidator.createInstagramReels, validate],
        PostController.createInstagramReels
    );
    router.get(
        '/get-instagram-reels',
        [authMiddleware, ...PostValidator.getInstagramReels, validate],
        PostController.getInstagramReels
    );
    router.patch(
        '/update-instagram-reels',
        [authMiddleware, ...PostValidator.updateInstagramReels, validate],
        PostController.updateInstagramReels
    );


    // Stories

    router.post(
        '/create-instagram-stories',
        [authMiddleware, ...PostValidator.createInstagramStories, validate],
        PostController.createInstagramStories
    );
    router.get(
        '/get-instagram-stories',
        [authMiddleware, ...PostValidator.getInstagramStories, validate],
        PostController.getInstagramStories
    );
    router.patch(
        '/update-instagram-stories',
        [authMiddleware, ...PostValidator.updateInstagramStories, validate],
        PostController.updateInstagramStories
    );

    return router;
};

module.exports = setupRouter;