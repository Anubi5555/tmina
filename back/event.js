var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    organizer: String,
    type: String,
    gameroom: String,
    attendees: String,
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