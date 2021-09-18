const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");

const MongoStore = require("connect-mongo");

const app = express();
dotenv.config("");

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = mongoose.createConnection(process.env.MONGO_URI, dbOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 24, // = A day
    },
  })
);

app.get("/", (req, res, next) => {
  console.log(req.session);
  if (req.session.viewCount) {
    ++req.session.viewCount;
  } else {
    req.session.viewCount = 1;
  }
  res.send(
    `<h1>Hi (Sessions) You have visited this page ${req.session.viewCount} times</h1>`
  );
});

app.listen(3000);
