const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mongoose = require('mongoose');
const UserModel = require('../models/user-model');
const mailService = require('./mail-service')
const FileService = require('./file-service')
const tokenService = require('./token-service')
const UserDto = require("../dtos/user-dto")
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, password, name, surname, phone) {
        const candidate = await UserModel.findOne({email, phone});

        if (candidate) throw ApiError.BadRequest(`Користувач з таким email ${email} або номером телефону ${phone} вже існує`)

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const createdUser = await UserModel.create({
            email,
            password: hashPassword,
            name,
            surname,
            phone,
            activationLink
        })
        await mailService.sendActivationMail(email, `${process.env.API_URL}api/activate/${activationLink}`);

        const user = await UserModel.findById(createdUser._id).populate({path: 'photo', model: 'File'}).lean();
        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return userDto;
    }

    async activate(activationLink) {
        const user = await UserModel.findOneAndUpdate({activationLink}, {isActivated: true})

        if (!user) throw ApiError.BadRequest('Некоректна силка активації');
    }

    async login(email, password) {
        const user = await UserModel.findOne({email}).populate({path: 'photo', model: 'File'}).lean();

        if (!user) throw ApiError.BadRequest("Користувач з таким email не знайдений")
        if (user.isActivated === false) throw ApiError.UnconfirmedEmail();

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) throw ApiError.BadRequest("Невірний пароль")

        const userDto = new UserDto(user);
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
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) throw ApiError.UnauthorizedError();

        const user = await UserModel.findById(userData.id).populate({path: 'photo', model: 'File'}).lean();
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async editUser(userData, editData) {
        const {name, surname, email, phone, photo, telegram} = editData;
        const findUser = await UserModel.findByIdAndUpdate(userData.id, {name, surname, email, phone, telegram});

        if (!findUser) throw ApiError.BadRequest("Користувач з таким id не знайдений")

        if (photo) {
            if (mongoose.isValidObjectId(findUser.photo)) await FileService.deleteFile(findUser.photo);

            const photoData = await FileService.uploadFile(editData.photo, userData, userData.id, "User");
            findUser.photo = photoData.id;

            await findUser.save();
        }

        const user = await UserModel.findById(userData.id).populate({path: 'photo', model: 'File'}).lean();

        return new UserDto(user);
    }

    async editSettingsUser(userData, editData) {
        const {darkMode, pushNotifications} = editData
        const findUser = await UserModel.findByIdAndUpdate(userData.id, {darkMode, pushNotifications}).populate({path: 'photo', model: 'File'}).lean();

        if (!findUser) throw ApiError.BadRequest("Користувач з таким id не знайдений")

        return new UserDto(findUser);
    }
}

module.exports = new UserService();