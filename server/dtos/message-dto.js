const mongoose = require('mongoose');

module.exports = class MessageDto {
    constructor(model) {
        this.id = model._id;
        this.chat = model.chat;
        this.sender = model.sender;
        this.content = model.content;
        this.isRead = model.isRead;
        this.timeSend = model.timeSend;
        this.files = model.files;
    }
};
