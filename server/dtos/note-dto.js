module.exports = class NoteDto {
    constructor(model) {
        this.id = model._id;
        this.text = model.text;
        this.dateCreated = model.dateCreated;
        this.author = {
            id: model.author.id,
            photo: model.author.photo,
        };
        this.belongTo = {
            id: model.belongTo.id,
            model: model.belongTo.model
        }
    }
};
