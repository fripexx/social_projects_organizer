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
        this.typeUser = model.typeUser;
        this.isActivated = model.isActivated;
        this.#photoID = model.photo;
    }

    async setPhotoData() {
        try {
            const fileModel = await FileModel.findById(this.#photoID);

            if(fileModel) {
                const fileDto = new FileDto(fileModel);
                this.photo = fileDto;
            } else {
                this.photo = null;
            }

        } catch (error) {
            this.photo = null;
            console.error("Помилка при отриманні фотографії:", error);
        }
    }
};
