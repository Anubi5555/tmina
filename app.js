const express = require("express");
const passport = require("passport");
const app = express();
const connectDB = require("./back/database");
const gameroom = require("./back/gameroom");
const event = require("./back/event");
const user = require("./back/user");

//start server
const port = 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});

//connect database and setup app
connectDB();
app.use(express.json());
app.use(express.static("front"));
app.use(require("express-session")({
    secret: "Destruktor je prosao i ostavio samo tminu",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//login and register functions
app.post("/api/register", async (req, res) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;

        const User = new user({
            email: email,
            username: username,
            role: role
        });

        await User.setPassword(password);
        await User.save();
        const savedUser = await user.authenticate()(username, password);

        res.json({
            success: true,
            user: savedUser
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});
app.post("/api/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const User = await user.authenticate()(username, password);

        req.session.user = User;

        res.json({
            success: true,
            user: User
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        });
    }
});
app.get("/api/getUser", (req,res,next) => {
    console.log.apply(req.session);
    res.json({username: req.session.user.username});
});
/*app.get("/api/logout", function(req, res){
    req.logout();
    res.redirect("/index.html");
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/log_in.html");
};*/

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
        //const organizer = req.body.organizer;
        const type = req.body.type;
        const gameroom = req.body.gameroom;
        //const attendees = req.body.attendees;
        const desc = req.body.desc;

        const newEvent = new event({
            name: name,
            //organizer: organizer,
            type: type,
            gameroom: gameroom,
            //attendees: attendees,
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