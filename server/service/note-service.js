const NoteModel = require('../models/note-model');
const ProjectModel = require('../models/project-model');
const ApiError = require("../exceptions/api-error");
const ProjectService = require("../service/project-service");
const NoteDto = require("../dtos/note-dto");

class NoteService {
    async createNoteUser({text, author, belong}) {
        const data = {
            text: text,
            dateCreated: new Date(),
            author: author.id,
            belongTo: {
                id: belong.id,
                model: belong.model
            }
        }
        const note = await NoteModel.create(data);

        return new NoteDto(note);
    }

    async deleteNoteUser(author, id) {
        const filter = {
            _id: id,
            author: author.id
        }
        const findNote = await NoteModel.findOneAndDelete(filter,null, {lean: true});

        if(!findNote) throw ApiError.BadRequest("Нотатку не знайдено.")

        return new NoteDto(findNote);
    }

    async changeNoteUser(author, id, text) {
        const filter = {
            _id: id,
            author: author.id,
            "belongTo.id": author.id,
            "belongTo.model": "User"
        }
        const findNote = await NoteModel.findOneAndUpdate(filter, {text}, {lean: true});

        if(!findNote) throw ApiError.BadRequest("Нотатку не знайдено.")

        return new NoteDto(findNote);
    }

    async getAllUser(author, belongToModel) {
        const query = {'author': author.id, 'belongTo.id': author.id, 'belongTo.model': belongToModel};
        const notes = await NoteModel.find(query, null, {lean: true});

        return notes.map(note => new NoteDto(note));
    }

    async getAllProject(id, user){
        const findProject = await ProjectService.getProject(user, id);

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього')

        const filter = {
            'belongTo.id': id,
            'belongTo.model': 'Project'
        }
        const options = {
            lean: true,
            exec: true,
            populate: {
                path: 'author',
                model: 'User',
                populate: {
                    path: 'photo',
                    model: 'File'
                }
            }
        }
        const notes = await NoteModel.find(filter, null, options);

        return notes.map(note => new NoteDto(note));
    }

    async addNoteInProject(user, idProject, text) {
        const filter = {
            _id: idProject,
            'team.user': user.id
        }
        const options = {
            lean: true,
            exec: true,
        }
        const findProject = await ProjectModel.findOne(filter, null, options);

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього')

        const data = {
            text: text,
            dateCreated: new Date(),
            author: user.id,
            belongTo: {
                id: idProject,
                model: "Project"
            }
        }
        const createNote = await NoteModel.create(data);

        const noteOptions = {
            lean: true,
            exec: true,
            populate: {
                path: 'author',
                model: 'User',
                populate: {
                    path: 'photo',
                    model: 'File',
                }
            }
        }
        const note = await NoteModel.findById(createNote._id, null, noteOptions);

        return new NoteDto(note);
    }

    async deleteNoteInProject(user, idNote, idProject) {
        const projectFilter = {
            _id: idProject,
            'team.user': user.id
        }
        const findProject = await ProjectModel.findOne(projectFilter, null, {lean: true});

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього')

        const noteFilter = {_id: idNote, 'belongTo.id': idProject, 'belongTo.model': "Project" }
        const findNote = await NoteModel.findOne(noteFilter);

        if(!findNote) throw ApiError.BadRequest('Помилка: Нотатки з таким ID не знайдено або у вас немає прав доступу до неї')
        if(findProject.administrator.toString() !== user.id && findNote.author.toString() !== user.id) throw ApiError.BadRequest('Помилка: Цей юзер не має право доступу змінювати або видаляти цю нотатку')

        await findNote.deleteOne();

        return new NoteDto(findNote);
    }

    async changeNoteInProject(user, idNote, idProject, text) {
        const projectFilter = {
            _id: idProject,
            'team.user': user.id
        }
        const findProject = await ProjectModel.findOne(projectFilter, null, {lean: true});

        if(!findProject) throw ApiError.BadRequest('Помилка: Проєкт із вказаним ID не знайдено або у вас немає прав доступу до нього')

        const noteFilter = {
            _id: idNote,
            'belongTo.id': idProject,
            'belongTo.model': "Project"
        }
        const findNote = await NoteModel.findOne(noteFilter);

        if(!findNote) throw ApiError.BadRequest('Помилка: Нотатки з таким ID не знайдено або у вас немає прав доступу до неї')
        if(findProject.administrator.toString() !== user.id && findNote.author.toString() !== user.id) throw ApiError.BadRequest('Помилка: Цей юзер не має право доступу змінювати або видаляти цю нотатку')

        findNote.text = text;
        await findNote.save();

        return new NoteDto(findNote);
    }
}

module.exports = new NoteService();