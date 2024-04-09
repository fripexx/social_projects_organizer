const NoteService = require("../service/note-service");

class NoteController {
    // Users
    async addNoteUser(req, res, next) {
        try {
            const {text} = await req.body;
            const user = await req.user;
            const noteParams = {
                text: text,
                author: user,
                belong: {
                    id: user.id,
                    model: "User"
                }
            }

            const note = await NoteService.createNoteUser(noteParams)

            return res.json(note);
        } catch (e) {
            next(e);
        }
    }
    async deleteNoteUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await req.user;
            const data = await NoteService.deleteNoteUser(user, id);

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async changeNoteUser(req, res, next) {
        try {
            const {noteId, text} = await req.body;
            const user = await req.user;
            const note = await NoteService.changeNoteUser(user, noteId, text);

            return res.json(note);
        } catch (e) {
            next(e)
        }
    }
    async getAllUser(req, res, next) {
        try {
            const user = await req.user;
            const notes = await NoteService.getAllUser(user, "User");

            return res.json(notes);
        } catch (e) {
            next(e)
        }

    }

    //Projects
    async getAllProject(req, res, next) {
        try {
            const {id} = req.query;
            const user = await req.user;

            const notes = await NoteService.getAllProject(id, user);

            return res.json(notes);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new NoteController();