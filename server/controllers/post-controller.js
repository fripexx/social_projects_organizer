const PostService = require("../service/post-service");

class PostController {


    /**
     * Publication
     */

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

    async updateInstagramPublication(req, res, next) {
        try {
            const user = await req.user;
            const data = req.body;
            const publication = await PostService.updateInstagramPublication(user, data);

            return res.json(publication);
        } catch (e) {
            next(e)
        }
    }


    /**
     * Reels
     */

    async createInstagramReels(req, res, next) {
        try {
            const user = await req.user;
            const data = req.body;
            const reels = await PostService.createInstagramReels(user, data)

            return res.json(reels);
        } catch (e) {
            next(e)
        }
    }

    async getInstagramReels(req, res, next) {
        try {
            const user = await req.user;
            const query = req.query;
            const reels = await PostService.getInstagramReels(user, query)

            return res.json(reels);
        } catch (e) {
            next(e)
        }
    }

    async updateInstagramReels(req, res, next) {
        try {
            const user = await req.user;
            const data = req.body;
            const reels = await PostService.updateInstagramReels(user, data);

            return res.json(reels);
        } catch (e) {
            next(e)
        }
    }


    /**
     * Stories
     */

    async createInstagramStories(req, res, next) {
        try {
            const user = await req.user;
            const data = req.body;
            const reels = await PostService.createInstagramStories(user, data)

            return res.json(reels);
        } catch (e) {
            next(e)
        }
    }

    async getInstagramStories(req, res, next) {
        try {
            const user = await req.user;
            const query = req.query;
            const reels = await PostService.getInstagramStories(user, query)

            return res.json(reels);
        } catch (e) {
            next(e)
        }
    }

    async updateInstagramStories(req, res, next) {
        try {
            const user = await req.user;
            const data = req.body;
            const reels = await PostService.updateInstagramStories(user, data);

            return res.json(reels);
        } catch (e) {
            next(e)
        }
    }


    /**
     * General
     */

    async deletePost(req, res, next) {
        try {
            const user = await req.user;
            const query = req.query;
            const post = await PostService.deletePost(user, query);

            return res.json(post);
        } catch (e) {
            next(e)
        }
    }

    async sendForConfirmation(req, res, next, io) {
        try {
            const user = await req.user;
            const {id} = req.body;
            const {post, project} = await PostService.sendForConfirmation(user, id);


            /**
             * Відправлення нотифікації автору поста
             */

            const notification = {
                project: {
                    id: project.id,
                    name: project.name,
                },
                postId: post.id,
                to: project.team.filter(item => item.role === "customer").map(item => item.user.toString()),
                message: `Публікація ${post.id} очікує підтвердження.`,
            }

            io.to(project.id).emit('changePostStatus', notification);

            return res.json(post);
        } catch (e) {
            next(e)
        }
    }

    async rejectPost(req, res, next, io) {
        try {
            const user = await req.user;
            const {id} = req.body;
            const {post, project} = await PostService.rejectPost(user, id);


            /**
             * Відправлення нотифікації автору поста
             */

            const notification = {
                project: {
                    id: project.id,
                    name: project.name,
                },
                postId: post.id,
                to: [post.author],
                message: `Публікація ${post.id} відхилена замовником.`,
            }

            io.to(project.id).emit('changePostStatus', notification);

            return res.json(post);
        } catch (e) {
            next(e)
        }
    }

    async confirmPost(req, res, next, io) {
        try {
            const user = await req.user;
            const {id} = req.body;
            const {post, project} = await PostService.confirmPost(user, id);


            /**
             * Відправлення нотифікації автору поста
             */

            const notification = {
                project: {
                    id: project.id,
                    name: project.name,
                },
                postId: post.id,
                to: [post.author],
                message: `Публікація ${post.id} підтверджена замовником.`,
            }

            io.to(project.id).emit('changePostStatus', notification);

            return res.json(post);
        } catch (e) {
            next(e)
        }
    }

    async getPosts(req, res, next){
        try {
            const user = await req.user;
            const query = req.query;
            const postsData = await PostService.getPosts(user, query);

            return res.json(postsData);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController();