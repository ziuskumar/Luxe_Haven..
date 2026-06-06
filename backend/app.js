if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("./Models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const DEFAULT_LOCAL_DB_URL = "mongodb+srv://luckykv17_db_user:HETcndVJlRbg38xS@clusterlx.zfgujix.mongodb.net/THEAIR?retryWrites=true&w=majority&appName=Cluster0";
let dburl = process.env.MONGO_URL || process.env.ATLAS_URI;
if (!dburl || (!dburl.startsWith("mongodb://") && !dburl.startsWith("mongodb+srv://"))) {
  dburl = DEFAULT_LOCAL_DB_URL;
}
const sessionSecret = process.env.SECRET || "Secret";
const port = Number(process.env.PORT) || 3000;
const MongoStore = require("connect-mongo");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./Models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const User = require("./Models/user.js");

const listingRouter = require("./Route/listing.js");
const reviewRouter = require("./Route/review.js");
const UserRouter = require("./Route/user.js");

async function main() {
  await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "../frontend/Public")));

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: sessionSecret,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Session store error:", err);
});

const sessionOption = {
  store,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true only if using HTTPS
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// session and flash MW

app.use(session(sessionOption));
app.use(flash());

//Passport MW (passport requires session)
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.session.user || null;
  res.locals.searchQuery = req.query.q || "";
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "student",
//   });
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
//   console.log(registeredUser);
// })

//   let registeredUser = await User.register(fakeUser, "123hii");
//   res.send(registeredUser);
// })

// app.get("/session-test", (req, res) => {
//   req.session.views = (req.session.views || 0) + 1;
//   res.json({ sessionID: req.sessionID, views: req.session.views });
// });

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.get("/privacy", (req, res) => {
  res.send(`
    <h1>TheAIR Privacy Policy</h1>
    <p>This demo app stores account, listing, and review data to support core site features.</p>
    <p>Uploaded images are stored using Cloudinary. Sessions are used to keep you logged in.</p>
    <p><a href="/listings">Back to Listings</a></p>
  `);
});

app.get("/terms", (req, res) => {
  res.send(`
    <h1>TheAIR Terms</h1>
    <p>This is a learning project. Please use respectful content when creating listings and reviews.</p>
    <p>Accounts created here are for demo use only and can be removed at any time.</p>
    <p><a href="/listings">Back to Listings</a></p>
  `);
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", UserRouter);

const validateListings = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new ExpressError(400, errorMessages);
  } else {
    next();
  }
};

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  if (res.headersSent) {
    return next(err);
  }
  res.status(statusCode).render("error.ejs", { err });
});

main()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(
      "MongoDB connection failed. Check your ATLAS_URI/MONGO_URL or network access.",
    );
    console.error(err);
    process.exit(1);
  });
