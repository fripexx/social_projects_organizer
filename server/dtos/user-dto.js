const mongoose = require("mongoose");
const FileDto = require("../dtos/file-dto")

module.exports = class UserDto {
    photo = null;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.surname = model.surname;
        this.phone = model.phone;
        this.telegram = model.telegram;
        this.typeUser = model.typeUser;
        this.darkMode = model.darkMode;
        this.pushNotifications = model.pushNotifications;
        this.isActivated = model.isActivated;
        this.photo = model.photo;

        if(mongoose.isValidObjectId(model.photo)) {
            this.photo = new FileDto(this.photo);
        }
    }
};