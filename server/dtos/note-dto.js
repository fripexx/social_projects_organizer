const mongoose = require('mongoose');
const FileDto = require("./file-dto");
const UserDto = require("./user-dto");
const {ObjectId} = require('mongoose');

module.exports = class NoteDto {
    constructor(model) {
        this.id = model._id;
        this.text = model.text;
        this.dateCreated = model.dateCreated;
        this.belongTo = {
            id: model.belongTo.id,
            model: model.belongTo.model
        }
        this.author = this.convertAuthor(model.author);
    }

    convertAuthor(author) {
        if(!author) return null

        if(author instanceof ObjectId) return author

        if(author?._id instanceof ObjectId) return new UserDto(author)

        return null;
    }
};
