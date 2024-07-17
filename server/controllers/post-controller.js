const PostService = require("../service/post-service");

class PostController {
    async createInstagramPublication(req, res, next) {
        try {
            const user = await req.user;
            const data = req.body;
            const publication = await PostService.createInstagramPublication(user, data)

            return res.json(publication);
        } catch (e) {
            next(e)
        }
    }

    async getInstagramPublication(req, res, next) {
        try {
            const user = await req.user;
            const query = req.query;
            const publication = await PostService.getInstagramPublication(user, query)

            return res.json(publication);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController();