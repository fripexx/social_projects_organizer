const {Schema, model} = require('mongoose');

const MessageSchema = new Schema({
    content: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    dateSend: {type: Date, default: Date.now},
    uploads: [{type: Schema.Types.ObjectId, ref: "File"}]
});

const ChatSchema = new Schema({
    belongTo: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'belongToModel'
    },
    belongToModel: {
        type: String,
        required: true,
        enum: ['Project', 'Post']
    },
    messages: [MessageSchema],
})

module.exports = model('Chat', ChatSchema);


