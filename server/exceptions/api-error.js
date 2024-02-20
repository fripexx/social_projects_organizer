module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Користувач не авторизований')
    }

    static UnconfirmedEmail() {
        return new ApiError(403, 'Ваш обліковий запис не підтверджено. Будь ласка, перевірте свою електронну пошту та підтвердіть реєстрацію, щоб мати можливість увійти на сайт.')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static NotFound(message = 'Не знайдено') {
        return new ApiError(404, message);
    }

    static InternalServerError(message = 'Внутрішня помилка сервера') {
        return new ApiError(500, message);
    }
}