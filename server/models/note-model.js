const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    text: {type: String, required: true},
    dateCreated: Date,
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    belongTo: {
        id: { type: Schema.Types.ObjectId, required: true },
        model: { type: String, required: true, enum: ['User', 'Project'] }
    },
})

module.exports = model('Note', NoteSchema);