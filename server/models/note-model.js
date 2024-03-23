const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    text: {type: String, required: true},
    dateCreated: Date,
    belongTo: {
        id: { type: Schema.Types.ObjectId, required: true },
        model: { type: String, required: true, enum: ['User', 'Project'] }
    },
    author: {
        id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        photo: { type: String, default: null }
    }
})

module.exports = model('Note', NoteSchema);