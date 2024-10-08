const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const UserValidator = require('../validators/user-validator')
const NoteController = require('../controllers/note-controller')
const NoteValidator = require('../validators/note-validator')
const ProjectController = require('../controllers/project-controller')
const ProjectValidator = require('../validators/project-validator')
const ChatController = require('../controllers/chat-controller')
const PostController = require('../controllers/post-controller')
const PostValidator = require('../validators/post-validator')
const DocumentController = require('../controllers/document-controller')
const DocumentValidator = require('../validators/document-validator')
const ApiError = require("../exceptions/api-error");
const {body, validationResult} = require('express-validator')
const uploadUserMiddleware = require('../middlewares/upload-user-middleware');
const uploadProjectLogoMiddleware = require('../middlewares/upload-project-logo-middleware');
const uploadMediaLibraryMiddleware = require('../middlewares/upload-media-library-middleware');
const uploadChatMiddleware = require('../middlewares/upload-chat-middleware');
const uploadProjectDocumentMiddleware = require('../middlewares/upload-project-document-middleware');
const authMiddleware = require('../middlewares/auth-middleware')

const setupRouter = ({io}) => {
    const router = new Router();

    const validate = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw ApiError.BadRequest("Помилка валідації", errors.array())
        next();
    };

    /**
     * User routes
     */
    router.post(
        '/registration',
        [...UserValidator.registration, validate],
        UserController.registration
    );
    router.post(
        '/login',
        [...UserValidator.login, validate],
        UserController.login
    );
    router.post(
        '/send-activate-link',
        [...UserValidator.sendActivateLink, validate],
        UserController.sendActivateLink
    );
    router.post('/logout', UserController.logout);
    router.get(
        '/activate/:link',
        [...UserValidator.activate, validate],
        UserController.activate
    );
    router.get('/refresh', UserController.refresh);
    router.post(
        '/edit-user',
        [authMiddleware, ...UserValidator.editUser, validate, uploadUserMiddleware],
        UserController.editUser
    );
    router.post(
        '/edit-settings-user',
        [authMiddleware, ...UserValidator.editSettings, validate],
        UserController.editSettingsUser
    );

    /**
     * User notes routes
     */
    router.post(
        '/add-note-user',
        [authMiddleware, ...NoteValidator.addNoteUser, validate],
        NoteController.addNoteUser
    );
    router.delete(
        '/delete-note-user/:id',
        [authMiddleware, ...NoteValidator.deleteNoteUser, validate],
        NoteController.deleteNoteUser
    );
    router.patch(
        '/change-note-user',
        [authMiddleware, ...NoteValidator.changeNoteUser, validate],
        NoteController.changeNoteUser
    );
    router.get(
        '/get-notes-user',
        [authMiddleware],
        NoteController.getAllUser
    );

    /**
     * Project routes
     */
    router.post(
        '/add-project',
        [authMiddleware, ...ProjectValidator.addProject, validate],
        ProjectController.addProject
    );
    router.get(
        '/get-projects',
        [authMiddleware],
        ProjectController.getProjects
    );
    router.get(
        '/get-project',
        [authMiddleware, ...ProjectValidator.getProject, validate],
        ProjectController.getProject
    );
    router.put(
        '/edit-settings-project',
        [authMiddleware, ...ProjectValidator.editSettingsProject, validate, uploadProjectLogoMiddleware],
        ProjectController.editSettingsProject
    );

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
    router.get(
        '/confirm-new-administrator/:key',
        [...ProjectValidator.confirmNewAdministrator, validate],
        async (req, res, next) => {
            await ProjectController.confirmNewAdministrator(req, res, next, io);
        }
    );
    router.patch(
        '/remove-user-from-team',
        [authMiddleware, ...ProjectValidator.removeUserFromTeam, validate],
        async (req, res, next) => {
            await ProjectController.removeUserFromTeam(req, res, next, io);
        }
    );
    router.patch(
        '/add-user-in-team',
        [authMiddleware, ...ProjectValidator.addUserInTeam, validate],
        async (req, res, next) => {
            await ProjectController.addUserInTeam(req, res, next, io);
        }
    );
    router.patch(
        '/change-role-user',
        [authMiddleware, ...ProjectValidator.changeRoleUser, validate],
        async (req, res, next) => {
            await ProjectController.changeRoleUser(req, res, next, io);
        }
    );
    router.patch(
        '/leave-project',
        [authMiddleware, ...ProjectValidator.leaveProject, validate],
        async (req, res, next) => {
            await ProjectController.leaveProject(req, res, next, io);
        }
    );

    /**
     * Project notes routes
     */
    router.get(
        '/get-notes-project',
        [authMiddleware, ...NoteValidator.getNotesProject, validate],
        NoteController.getAllProject
    );
    router.post(
        '/add-note-in-project',
        [authMiddleware, ...NoteValidator.addNoteInProject, validate],
        NoteController.addNoteInProject
    );
    router.delete(
        '/delete-note-in-project',
        [authMiddleware, ...NoteValidator.deleteNoteInProject, validate],
        NoteController.deleteNoteInProject
    );
    router.patch(
        '/change-note-in-project',
        [authMiddleware, ...NoteValidator.changeNoteInProject, validate],
        NoteController.changeNoteInProject
    );


    /**
     * Project media routes
     */
    router.post(
        '/upload-media',
        [authMiddleware, ...ProjectValidator.uploadMedia, validate, uploadMediaLibraryMiddleware],
        ProjectController.uploadMedia
    );
    router.get(
        '/get-media',
        [authMiddleware, ...ProjectValidator.getMedia, validate],
        ProjectController.getMedia
    );
    router.get(
        '/get-media-one',
        [authMiddleware, ...ProjectValidator.getMediaOne, validate],
        ProjectController.getMediaOne
    );
    router.delete(
        '/delete-media',
        [authMiddleware, ...ProjectValidator.deleteMedia, validate],
        ProjectController.deleteMedia
    );


    /**
     * Project chat routes
     */
    router.post(
        '/send-message',
        [authMiddleware, uploadChatMiddleware],
        async (req, res, next) => {
        await ChatController.sendMessage(req, res, next, io);
    }
    );


    /**
     * Project documents routes
     */
    router.get(
        '/get-documents',
        [authMiddleware, ...DocumentValidator.getDocuments, validate],
        DocumentController.getDocuments
    );
    router.post(
        '/set-document',
        [authMiddleware, ...DocumentValidator.setDocument, validate, uploadProjectDocumentMiddleware],
        DocumentController.setDocument
    );
    router.delete(
        '/delete-document',
        [authMiddleware, ...DocumentValidator.deleteDocument, validate],
        DocumentController.deleteDocument
    );


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