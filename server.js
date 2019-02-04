const express = require(`express`);
const path = require(`path`);
const PORT = process.env.PORT || 3001;
const app = express();
require(`dotenv`).config();

//Setting up passport
const passport = require(`passport`);
const session = require(`express-session`);
const cookieParser = require('cookie-parser');

//Setting up mongoose
const mongoose = require(`mongoose`);
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/bookClub`;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Setting up passport with express
app.use(session({ secret: 'First Blood' })); // Session Secret
app.use(passport.initialize());
app.use(passport.session()); // Persistent Login Sessions

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === `production`) {
  app.use(express.static(`client/build`));
};

//Load Passport Strategies
require('./handlers/passport.js')(passport);

// Define API routes here
app.get(`/api/test`, (req, res) => {
  res.json({ "correct": "response" });
});

require(`./routes/apiRoutes`)(app);
require(`./routes/groupRoutes`)(app);
require("./routes/passportRoutes")(app, passport);

// Send every other request to the React app
// Define any API routes before this runs
app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `./client/build/index.html`));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
