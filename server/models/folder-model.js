const {Schema, model} = require('mongoose');

const FolderSchema = new Schema({
    dateCreated: {type: Date, default: Date.now()},
    name: {type: String, required: true},
    belongTo: {type: Schema.Types.ObjectId, ref: "Project", required: true},
})

module.exports = model('Folder', FolderSchema);