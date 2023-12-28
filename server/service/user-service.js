const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require("../dtos/user-dto")
const ApiError = require('../exceptions/api-error')

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
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})

        if (!user)  throw ApiError.BadRequest('Некоректна силка активації');

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})

        if(!user)  throw ApiError.BadRequest("Користувач з таким email не знайдений")
        if(user.isActivated === false) throw ApiError.UnconfirmedEmail();

        const isPassEquals = await bcrypt.compare(password, user.password);

        if(!isPassEquals) throw ApiError.BadRequest("Невірний пароль")

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token  = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError();
        }

        const user = UserModel.findById(user.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async getAllUsers() {

    }
}

module.exports = new UserService();