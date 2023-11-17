const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    belongTo: {
        type: String,
        enum: ['project', 'user']
    },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true}
})

module.exports = model('Note', NoteSchema);