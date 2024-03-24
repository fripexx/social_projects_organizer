const {Schema, model} = require('mongoose');

const ProjectSchema = new Schema({
    isActive: {type: Boolean, default: true},
    name: {type: String, required: true},
    logo: {type: Schema.Types.ObjectId, ref: "File", default: null},
    administrator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    team: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], required: true },
    color: {type: String, default: null},
    instagramTokenAPI: {type: String, default: null},
    linkFigma: {type: String, default: null},
    linkCanva: {type: String, default: null},
    workingHours: {
        from: {type: String, default: null},
        to: {type: String, default: null}
    },
    workingDays: {type: String, default: null},
    files: {
        brif: { type: String, default: null},
        contract: { type: String, default: null},
        strategy: { type: String, default: null}
    },
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],
})

module.exports = model('Project', ProjectSchema);