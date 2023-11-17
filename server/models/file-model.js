const {Schema, model} = require('mongoose');

const FileSchema = new Schema({
    filePath: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now()},
    extension: {type: String, required: true},
    belongTo: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'belongToModel'
    },
    belongToModel: {
        type: String,
        required: true,
        enum: ['Project', 'Chat', 'User']
    },
    folder: {type: Schema.Types.Mixed}
})

module.exports = model('File', FileSchema);