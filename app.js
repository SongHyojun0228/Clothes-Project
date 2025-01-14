const express = require("express");
const app = express();

const db = require("./data/database");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const MongoDbStore = mongodbStore(session);

const sessionStore = new MongoDbStore({
  uri: "mongodb+srv://thdgywns2300:oF4luy5LHKI7Cah3@gym.4vl2x.mongodb.net/Gym?retryWrites=true&w=majority&appName=Gym",
  databaseName: "Clothes",
  collection: "sessions",
});

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    isAuthenticated : false,
    store: sessionStore,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  let isAuth = req.session.isAuthenticated;
  res.locals.isAuth = isAuth;

  if (!isAuth) {
    return next();
  }

  next();
});

app.use(express.json());

const path = require("path");
const defaultRouter = require("./routes/default.routes");
const userRouter = require("./routes/user.routes");
const cafeRouter = require("./routes/cafe.routes");
// const addRouter = require("./routes/add.routes");
// const wishRouter = require("./routes/wish.routes");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", defaultRouter);
app.use("/", userRouter);
app.use("/", cafeRouter);
// app.use("/", addRouter);
// app.use("/", wishRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
