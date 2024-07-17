const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstagramPublicationSchema = new Schema({
    media: [{type: Schema.Types.ObjectId, ref: 'File', required: true}],
    description: {type: String, default: ""},
    aspectRatio: {
        type: String,
        enum: ['1.91/1', '1/1', '4/5'],
        required: true
    },
});

const InstagramStoriesSchema = new Schema({
    media: {type: Schema.Types.ObjectId, ref: 'File', required: true},
});

const InstagramReelsSchema = new Schema({
    media: {type: Schema.Types.ObjectId, ref: 'File', required: true},
    musicTrack: {type: String, default: ""},
    description: {type: String, default: ""},
});

const TiktokPublicationSchema = new Schema({
    media: [{type: Schema.Types.ObjectId, ref: 'File', required: true}],
    description: {type: String, default: ""},
});

const TiktokStoriesSchema = new Schema({
    media: {type: Schema.Types.ObjectId, ref: 'File', required: true},
});

const PostModelSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    status: {
        type: String,
        enum: ['edit', 'pending', 'rejected', 'confirmed'],
        required: true,
    },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    dateCreated: {type: Date, default: Date.now},
    datePublish: {type: Date, default: Date.now},
    social: {
        type: String,
        enum: ['instagram', 'tiktok'],
        required: true
    },
    typePost: {
        type: String,
        enum: ['publication', 'stories', 'reels'],
        required: true
    },
    params: {
        type: Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value) {
                if (this.social === 'instagram') {
                    switch (this.typePost) {
                        case 'publication':
                            return validateAgainstSchema(value, InstagramPublicationSchema);
                        case 'stories':
                            return validateAgainstSchema(value, InstagramStoriesSchema);
                        case 'reels':
                            return validateAgainstSchema(value, InstagramReelsSchema);
                        default:
                            return false;
                    }
                } else if (this.social === 'tiktok') {
                    switch (this.typePost) {
                        case 'publication':
                            return validateAgainstSchema(value, TiktokPublicationSchema);
                        case 'stories':
                            return validateAgainstSchema(value, TiktokStoriesSchema);
                        default:
                            return false;
                    }
                }
                return false;
            },
            message: props => `${props.value} is not a valid params object for social ${this.social} and typePost ${this.typePost}`
        }
    }
});

function validateAgainstSchema(value, schema) {
    try {
        const model = mongoose.model('TempModel', schema); // Create a temporary model
        const doc = new model(value);
        doc.validateSync();
        return true;
    } catch (error) {
        return false;
    }
}

const PostModel = mongoose.model('PostModel', PostModelSchema);

module.exports = PostModel;
