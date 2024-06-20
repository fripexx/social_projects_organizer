const {Schema, model} = require('mongoose');

const fileReferenceSchema = { type: Schema.Types.ObjectId, ref: "File" };

const InstagramSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    status: {
        type: String,
        enum: ['publish', 'rejected', 'edit', 'confirmed'],
        required: true,
    },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    dateCreated: {type: Date, default: Date.now},
    datePublish: {type: Date, default: Date.now},
    description: {type: String, default: ""},
    typePost: {
        type: String,
        enum: ['post', 'stories', 'reels'],
        required: true,
    },
    uploads: {
        type: [fileReferenceSchema],
        validate: {
            validator: function(v) {
                return this.typePost === 'post' ? Array.isArray(v) : !Array.isArray(v)
            },
            message: props => `${props.value} не є валідним!`
        }
    }
});

InstagramSchema.pre('validate', function(next) {
    if (this.typePost !== 'post' && Array.isArray(this.uploads)) {
        this.invalidate('uploads', 'Uploads мають бути посиланням на один файл для типів, які не дорівнюють "post".');
    }
    if (this.typePost === 'post' && !Array.isArray(this.uploads)) {
        this.invalidate('uploads', 'Uploads мають бути масивом для типу "post".');
    }
    next();
});

module.exports = model('Post', InstagramSchema);