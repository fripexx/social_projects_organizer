const {Schema, model} = require('mongoose');

const ChatSchema = new Schema({
    belongTo: {
        id: { type: Schema.Types.ObjectId, required: true, refPath: 'belongToModel' },
        model: { type: String, required: true, enum: ['Project', 'Post'] }
    },
})

module.exports = model('Chat', ChatSchema);