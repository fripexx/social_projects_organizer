const ApiError = require("../exceptions/api-error");

class InstagramPostsController {
    async addInstagramPosts(req, res, next) {
        try {
            const user = await req.user;
            console.log(req.body)
            return res.json();
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new InstagramPostsController();