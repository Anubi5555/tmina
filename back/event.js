var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        organizer: {
            type: String,
            required: true
        },
        gameroom: {
            type: String,
            required: true
        },
        game: {
            type: String,
            required: true
        },
        price: String,
        attendees: {
            type: String,
            required: true
        },
        prize: String
    },
    desc: String,
    createdAt: Date,
    updatedAt: Date
}, { collection: "events" });

eventSchema.pre("save", function (next) {
    var currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

module.exports = mongoose.model("event", eventSchema);