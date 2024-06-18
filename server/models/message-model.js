const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
    chat: {type: Schema.Types.ObjectId, required: true},
    sender: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    timeSend: {type: Date, default: Date.now},
    files: [{type: Schema.Types.ObjectId, ref: "File"}]
});

module.exports = model('Message', MessageSchema);