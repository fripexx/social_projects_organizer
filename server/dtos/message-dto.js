const mongoose = require('mongoose');
const FileDto = require("./file-dto");

module.exports = class MessageDto {
    constructor(model) {
        this.id = model._id;
        this.chat = model.chat;
        this.sender = model.sender;
        this.content = model.content;
        this.readBy = model.readBy;
        this.timeSend = model.timeSend;
        this.files = this.convertFiles(model.files);
    }

    convertFiles(files) {
        if(files && Array.isArray(files) && files.length !== 0) {
            const convertFilesArr = []
            for (const file of files) convertFilesArr.push(new FileDto(file));
            return convertFilesArr;
        }

        return [];
    }
};
