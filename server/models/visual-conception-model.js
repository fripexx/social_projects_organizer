const {Schema, model} = require('mongoose');

const HighLightsSchema = new Schema({
    photo: {type: Schema.Types.ObjectId, required: true},
    order: {type: Number, required: true}
});

const PostsProfileSchema = new Schema({
    photo: {type: Schema.Types.ObjectId, required: true},
    order: {type: Number, required: true}
});

const CalendarDaySchema = new Schema({
    name: {type: String, required: true},
    status: {
        type: String,
        enum: ['publish', 'rejected', 'edit', 'confirmed'],
        required: true,
    },
    dateCreated: {type: Date, default: Date.now()},
    project: {type: Schema.Types.ObjectId, ref: "Project", required: true},
    description: {type: String},
    linkFigma: {type: String},
    socialNetwork: {
        type: String,
        enum: ['instagram', 'tiktok'],
        required: true,
    },
    photoProfile: {type: Schema.Types.ObjectId},
    nameProfile: {type: String},
    descriptionProfile: {type: String},
    highLights: [HighLightsSchema],
    postsProfile: [PostsProfileSchema]
})

module.exports = model('VisualConception', CalendarDaySchema);