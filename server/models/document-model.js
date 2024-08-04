const {Schema, model} = require('mongoose');

const DocumentSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    name: {type: String, required: true},
    dateUpload: {type: Date, required: true},
    file: {type: Schema.Types.ObjectId, ref: "File", default: null}
})

module.exports = model('Document', DocumentSchema);