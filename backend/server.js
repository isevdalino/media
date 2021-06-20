const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const articles = require("./routes/api/articles");
const polls = require("./routes/api/polls");
const events = require("./routes/api/events");
const ratings = require("./routes/api/ratings");
const comments = require("./routes/api/comments");
const topics = require("./routes/api/topics");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/articles", articles);
app.use("/api/polls", polls);
app.use("/api/events", events);
app.use("/api/ratings", ratings);
app.use("/api/comments", comments);
app.use("/api/topics", topics);

const port = 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));