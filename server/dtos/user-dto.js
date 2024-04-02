const FileModel = require("../models/file-model");
const FileDto = require("../dtos/file-dto");

module.exports = class UserDto {
    email;
    id;
    isActivated;
    photo = null;
    #photoID = null;

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
        this.#photoID = model.photo;
    }

    async setPhotoData() {
        try {
            const fileModel = await FileModel.findById(this.#photoID);

            if(fileModel) {
                this.photo = new FileDto(fileModel);
            } else {
                this.photo = null;
            }

        } catch (error) {
            this.photo = null;
            console.error("Помилка при отриманні фотографії:", error);
        }
    }
};
