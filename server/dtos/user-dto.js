module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.surname = model.surname;
        this.phone = model.phone;
        this.typeUser = model.typeUser;
        this.isActivated = model.isActivated;
        this.photo = model.photo;
    }
}