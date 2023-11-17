const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    typeUser: {
        type: String,
        enum: ['customer', 'smm_manager', 'targetologist', 'designer'],
        required: true
    },
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    phone: {type: String, unique: true, required: true},
    telegram: {type: String, default: null},
    photo: {type: Schema.Types.ObjectId, ref: 'File', default: null},
    workingHours: {
        from: {type: String, default: null},
        to: {type: String, default: null}
    },
    workingDays: {type: String, default: null},
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    notes: [{type: Schema.Types.ObjectId, ref: 'Note'}],
    darkMode: {type: Boolean, default: false},
    pushNotifications: {type: Boolean, default: false},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, default: null}
})

module.exports = model('User', UserSchema);