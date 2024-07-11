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
    description: {type: String, default: ""},
});

const InstagramReelsSchema = new Schema({
    media: {type: Schema.Types.ObjectId, ref: 'File', required: true},
    musicTrack: {type: String, default: ""},
});

const InstagramModelSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    status: {
        type: String,
        enum: ['edit', 'pending', 'rejected', 'confirmed'],
        required: true,
    },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    dateCreated: {type: Date, default: Date.now},
    datePublish: {type: Date, default: Date.now},
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
            },
            message: props => `${props.value} is not a valid params object for typePost ${this.typePost}`
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


const InstagramModel = mongoose.model('InstagramModel', InstagramModelSchema);

module.exports = InstagramModel;
