const NoteModel = require('../models/note-model');
const ApiError = require("../exceptions/api-error");
const NoteDto = require("../dtos/note-dto");

class NoteService {
    async createNote({text, author, belong}) {
        const data = {
            text: text,
            dateCreated: new Date(),
            author: {
                id: author.id,
                photo: author.photo.cropped['300'],
            },
            belongTo: {
                id: belong.id,
                model: belong.model
            }
        }
        const note = await NoteModel.create(data)

        return new NoteDto(note);
    }
    async deleteNote(author, id) {
        const findNote = await NoteModel.findOneAndDelete({"_id": id, "author.id": author.id});

        if(!findNote) throw ApiError.BadRequest("Нотатку не знайдено.")

        return new NoteDto(findNote);
    }
    async changeNoteUser(author, id, text) {
        const findNote = await NoteModel.findOneAndUpdate({"_id": id, "author.id": author.id}, {text});

        if(!findNote) throw ApiError.BadRequest("Нотатку не знайдено.")

        return new NoteDto(findNote);
    }

    async getAllUser(author, belongToModel) {
        const query = {'author.id': author.id, 'belongTo.id': author.id, 'belongTo.model': belongToModel};
        const notes = await NoteModel.find(query);

        return notes.map(note => new NoteDto(note));
    }
}

module.exports = new NoteService();