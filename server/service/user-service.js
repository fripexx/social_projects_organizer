const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const FileService = require('./file-service')
const tokenService = require('./token-service')
const UserDto = require("../dtos/user-dto")
const ApiError = require('../exceptions/api-error')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

class UserService {
    async registration(typeUser, email, password, name, surname, phone) {
        const candidate = await UserModel.findOne({email, phone});

        if (candidate) throw ApiError.BadRequest(`Користувач з таким email ${email} або номером телефону ${phone} вже існує`)

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({
            typeUser,
            email,
            password: hashPassword,
            name,
            surname,
            phone,
            activationLink
        })
        await mailService.sendActivationMail(email, `${process.env.API_URL}api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        await userDto.setPhotoData();

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})

        if (!user) throw ApiError.BadRequest('Некоректна силка активації');

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})

        if (!user) throw ApiError.BadRequest("Користувач з таким email не знайдений")
        if (user.isActivated === false) throw ApiError.UnconfirmedEmail();

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) throw ApiError.BadRequest("Невірний пароль")

        const userDto = new UserDto(user);
        await userDto.setPhotoData();

        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async sendActivateLink(email) {
        const user = await UserModel.findOne({email})

        if (!user) throw ApiError.BadRequest("Користувач з таким email не знайдений")
        if (user.isActivated === true) throw ApiError.BadRequest("Користувач з таким email вже активований")

        await mailService.sendActivationMail(email, `${process.env.API_URL}api/activate/${user.activationLink}`);

        return email;
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) throw ApiError.UnauthorizedError();

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        await userDto.setPhotoData();

        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async editUser(userData, editData) {
        const {name, surname, email, phone, photo, telegram} = editData;
        const findUser = await UserModel.findByIdAndUpdate(userData.id, {name, surname, email, phone, telegram});

        if (!findUser) throw ApiError.BadRequest("Користувач з таким id не знайдений")

        if (photo) {
            if (findUser.photo instanceof ObjectId) await FileService.deleteImage(findUser.photo);

            const photoData = await FileService.uploadImage(editData.photo, userData.id, "User");
            findUser.photo = photoData.id;

            await findUser.save();
        }

        const userDto = new UserDto(findUser);
        await userDto.setPhotoData();

        return userDto;
    }

    async editSettingsUser(userData, editData) {
        const {darkMode, pushNotifications} = editData
        const findUser = await UserModel.findByIdAndUpdate(userData.id, {darkMode, pushNotifications});

        if (!findUser) throw ApiError.BadRequest("Користувач з таким id не знайдений")

        const userDto = new UserDto(findUser);
        await userDto.setPhotoData();

        return userDto;
    }
}

module.exports = new UserService();