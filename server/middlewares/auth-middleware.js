const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service');

module.exports = async function(req, res, next) {
    try {
        const autorizationHeader = req.headers.authorization;
        if(!autorizationHeader) return next(ApiError.UnauthorizedError());

        const accessToken = autorizationHeader.split(" ")[1];
        if(!accessToken) next(ApiError.UnauthorizedError());

        const userData = await tokenService.validateAccessToken(accessToken);
        if(!userData) next(ApiError.UnauthorizedError());

        req.user = userData;

        next();

    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}