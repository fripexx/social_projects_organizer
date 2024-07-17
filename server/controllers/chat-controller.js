const ApiError = require("../exceptions/api-error");
const ChatService = require("../service/chat-service");
const ProjectService = require("../service/project-service");
const PostService = require("../service/post-service");
const FileService = require("../service/file-service");

class ChatController {
    async sendMessage(req, res, next, io) {
        try {
            const user = await req.user;
            const files = req.files;
            const { chat, model, content } = req.body;

            if(!user) throw ApiError.BadRequest('В запиті відсутні дані про юзера');

            if(model === "Project") {


                /**
                 * Перевірка доступу до проєкту
                 */

                await ProjectService.checkUserAccessToProject(chat, user);


                /**
                 * Збереження файлів
                 */

                const idsFile = []

                if(files && Array.isArray(files)) {
                    for (const file of files) {
                        const fileData = await FileService.uploadFile(file, user, chat, "Chat");
                        idsFile.push(fileData.id);
                    }
                }


                /**
                 * Створення та відправка повідомлення
                 */

                const message = await ChatService.addMessage(chat, user.id, content, idsFile);

                io.to(chat).emit('newMessage', {chatId: chat, message});
            }

            if(model === "Post") {


                /**
                 * Перевірка доступу до проєкту
                 */

                const {project, post} = await PostService.checkUserAccessToPost(chat, user, true, true, true);


                /**
                 * Збереження файлів
                 */

                const idsFile = []

                if(files && Array.isArray(files)) {
                    for (const file of files) {
                        const fileData = await FileService.uploadFile(file, user, chat, "Chat");
                        idsFile.push(fileData.id);
                    }
                }


                /**
                 * Створення та відправка повідомлення
                 */

                const message = await ChatService.addMessage(chat, user.id, content, idsFile)

                io.to(chat).emit('newMessage', {chatId: chat, message});


                /**
                 * Відправлення нотифікацій команді
                 */

                const notification = {
                    project: {
                        id: project._id.toString(),
                        name: project.name,
                    },
                    postId: post._id,
                    message: `${user.name} залишив коментар до посту - ${post._id}`,
                }

                io.to(project._id.toString()).emit('commentPost', notification);
            }

            return res.json();
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new ChatController();