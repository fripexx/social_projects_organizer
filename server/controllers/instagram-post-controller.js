const ApiError = require("../exceptions/api-error");

class InstagramPostController {
    async createInstagramPublication(req, res, next) {
        try {
            const user = await req.user;
            console.log(req.body)
            return res.json();
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new InstagramPostController();