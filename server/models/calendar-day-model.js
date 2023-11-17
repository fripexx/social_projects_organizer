const {Schema, model} = require('mongoose');

const CalendarDaySchema = new Schema({
    date: {type: Date, default: Date.now()},
    text: {type: String, required: true},
    calendar: {
        type: String,
        enum: ['content-plan', 'events'],
        required: true,
    },
    author: {type: Schema.Types.ObjectId, ref: "User", required: true}
})

module.exports = model('CalendarDay', CalendarDaySchema);