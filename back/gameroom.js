var mongoose = require("mongoose");

var gameroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: String,
    game: String,
    hours: {
        mon: String,
        tue: String,
        wed: String,
        thu: String,
        fri: String,
        sat: String,
        sun: String
    },
    prices: {
        one: String,
        five: String,
        ten: String
    },
    contact: {
        phone: String,
        email: String
    },
    specs: {
        cpu: String,
        gpu: String,
        ram: String
    },
    description: String,
    map: String,
    createdAt: Date,
    updatedAt: Date
}, { collection: "gamerooms" });

gameroomSchema.pre("save", function (next) {
    var currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt)
        this.createdAt = currentDate;
    next();
});

module.exports = mongoose.model("gameroom", gameroomSchema);