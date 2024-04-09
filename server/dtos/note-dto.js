const mongoose = require('mongoose');

module.exports = class NoteDto {
    constructor(model) {
        this.id = model._id;
        this.text = model.text;
        this.dateCreated = model.dateCreated;
        this.belongTo = {
            id: model.belongTo.id,
            model: model.belongTo.model
        }
        if(model.author) {
            if (mongoose.isValidObjectId(model.author)) this.author = model.author;
            if(typeof model.author === 'object' && model.author?._id){

                this.author = {
                    id: model.author._id,
                    name: model.author?.name,
                    surname: model.author?.surname,
                    photo: null,
                }

                if(model.author.photo) {
                    this.author.photo = {
                        path: model.author.photo.path,
                        cropped: {
                            '300': model.author.photo.cropped['300'],
                            '600': model.author.photo.cropped['600'],
                            '1080': model.author.photo.cropped['1080'],
                        }
                    }
                }
            }
        } else {
            this.author = null;
        }
    }
};
