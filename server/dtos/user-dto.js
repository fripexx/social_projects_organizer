const mongoose = require("mongoose");
const FileDto = require("../dtos/file-dto")
const { ObjectId } = mongoose.Types;

module.exports = class UserDto {
    constructor(model, type = 'full') {
        this.id = model._id;
        this.name = model.name;
        this.surname = model.surname;
        this.email = model.email;
        this.phone = model.phone;
        this.telegram = model.telegram;
        this.photo = this.convertPhoto();

        if(type === "full") {
            this.typeUser = model.typeUser;
            this.darkMode = model.darkMode;
            this.pushNotifications = model.pushNotifications;
            this.isActivated = model.isActivated;
        }
    }

    convertPhoto(photo) {
        if(!photo) return null

        if(photo instanceof ObjectId) return photo

        if(photo?._id instanceof ObjectId) return new FileDto(photo)

        return null;
    }
};