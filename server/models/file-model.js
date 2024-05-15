const {Schema, model} = require('mongoose');

const FileSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['image', 'application', 'video', 'text']
    },
    extension: {type: String, required: true},
    mimetype: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now()},
    path: { type: String, required: true },
    cropped: {
        type: {
            '300': { type: String },
            '600': { type: String },
            '1080': { type: String }
        },
        validate: {
            validator: function() {
                return this.type === 'image';
            },
            message: 'Cropped data is only applicable for images.'
        }
    },
    belongTo: {
        id: { type: Schema.Types.ObjectId, required: true },
        model: { type: String, required: true, enum: ['Project', 'Chat', 'User'] }
    },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true },
})

module.exports = model('File', FileSchema);