const {Schema, model} = require('mongoose');

const ProjectSchema = new Schema({
    isActive: {type: Boolean, default: true},
    name: {type: String, required: true},
    logo: {type: Schema.Types.ObjectId, ref: "File"},
    administrator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    team: [{type: Schema.Types.ObjectId, ref: 'User'}],
    color: {type: String, required: true},
    instagramTokenAPI: {type: String},
    linkFigma: {type: String},
    linkCanva: {type: String},
    workingHours: {
        from: {type: String},
        to: {type: String}
    },
    workingDays: {type: String},
    files: {
        brif: { type: String },
        contract: { type: String },
        strategy: { type: String }
    },
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],
})

module.exports = model('Project', ProjectSchema);