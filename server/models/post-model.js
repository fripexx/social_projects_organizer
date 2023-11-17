const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
    status: {
        type: String,
        enum: ['publish', 'rejected', 'edit', 'confirmed'],
        required: true,
    },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    dateCreated: {type: Date, default: Date.now},
    datePublish: {type: Date, default: Date.now},
    description: {type: String},
    socialNetwork: {
        type: String,
        enum: ['instagram', 'tiktok'],
        required: true,
    },
    typePost: {
        type: String,
        enum: {
            values: function () {
                switch (this.socialNetwork) {
                    case 'tiktok':
                        return ['video'];
                    case 'instagram':
                        return ['post', 'stories', 'reals'];
                    default:
                        return [];
                }
            },
            message: 'Неприпустиме значення для typePost',
        }
    },
    uploads: [{type: Schema.Types.ObjectId, ref: "File"}],
    chat: {type: Schema.Types.ObjectId, ref: 'Chat', required: true},
})

module.exports = model('Post', PostSchema);


