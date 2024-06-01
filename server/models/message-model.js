const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
    chat: {type: Schema.Types.ObjectId, required: true},
    sender: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    isRead: {type: Boolean, default: false, required: true},
    timeSend: {type: Date, default: Date.now},
    files: [{type: Schema.Types.ObjectId, ref: "File"}]
});

module.exports = model('Message', MessageSchema);