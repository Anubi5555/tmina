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
    saveUninitialized: false
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

        const newUser = new user({
            email: email,
            username: username,
            role: role
        });

        await newUser.setPassword(password);
        await newUser.save();
        const savedUser = await newUser.authenticate()(username, password);

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
app.post("/api/login", passport.authenticate("local",{
    successRedirect:"/index.html",
    failureRedirect:"/log_in.html"
}), async (req, res) => {
    res.send("User is ");
});
app.post("/api/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

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