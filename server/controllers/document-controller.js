const DocumentService = require('../service/document-service');

class DocumentController {
    async getDocuments(req, res, next) {
        try {
            const {projectId} = req.query;
            const user = await req.user;
            const documents = await DocumentService.getDocuments(projectId, user);

            res.json(documents);
        } catch (e) {
            next(e);
        }
    }

    async setDocument(req, res, next) {
        try {
            const {projectId, name} = req.body;
            const file = req.file;
            const user = await req.user;
            const document = await DocumentService.setDocument({projectId, name, file}, user);

            res.json(document);
        } catch (e) {
            next(e);
        }
    }

    async deleteDocument(req, res, next) {
        try {
            const {id} = req.query;
            const user = await req.user;
            const documentID = await DocumentService.deleteDocument(id, user);

            res.json(documentID);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DocumentController();