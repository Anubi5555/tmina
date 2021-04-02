const express = require("express");
const app = express();
const connectDB = require("./back/database");
const gameroom = require("./back/gameroom");
const event = require("./back/event");

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

connectDB();
app.use(express.json());
app.use(express.static("front"));

//gameroom functions
app.get("/api/gamerooms", async (req, res) => {
    try {
        const allGamerooms = await gameroom.find();
        res.json({
            success: true,
            gamerooms: allGamerooms
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});
app.get("/api/gameroom", async (req, res) => {
    try {
        const id = req.query.id;
        const specificGameroom = await gameroom.findById(id);
        res.json({
            success: true,
            events: specificGameroom
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});

//event functions
app.get("/api/events", async (req, res) => {
    try {
        const allEvents = await event.find();
        res.json({
            success: true,
            events: allEvents
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});
app.get("/api/event", async (req, res) => {
    try {
        const id = req.query.id;
        const specificEvent = await event.findById(id);
        res.json({
            success: true,
            events: specificEvent
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});
app.post("/api/events", async (req, res) => {
    try {
        const name = req.body.name;
        const info = req.body.info;
        const desc = req.body.desc;

        const newEvent = new event({
            name: name,
            info: {
                organizer: info.organizer,
                gameroom: info.gameroom,
                game: info.game,
                price: info.price,
                attendees: info.attendees,
                prize: info.prize
            },
            desc: desc
        });
        const savedEvent = await newEvent.save();
        res.json({
            success: true,
            event: savedEvent
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});
app.delete("/api/events/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const specificEvent = await event.findById(eventId);
        const deletedEvent = await specificEvent.delete();
        res.json({
            success: true,
            event: deletedEvent
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});