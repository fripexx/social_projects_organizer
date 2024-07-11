const ApiError = require("../exceptions/api-error");
const InstagramPostService = require("../service/instagram-post-service");

class InstagramPostController {
    async createInstagramPublication(req, res, next) {
        try {
            const user = await req.user;
            const data = req.body;
            const publication = await InstagramPostService.createInstagramPublication(user, data)

            return res.json(publication);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new InstagramPostController();