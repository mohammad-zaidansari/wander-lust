if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");   //for delete, put, patch method from the form..
const ejsMate = require("ejs-mate");                  //for layouts templating
const ExpressError = require("./utils/ExpressError.js");      //import ExpressError.js
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")


app.set("view engine", "ejs");                   //use to ejs templates
app.set("views", path.join(__dirname, "views"));  //set path where ejs files
app.use(express.urlencoded({extended: true}));     //all data of the req body can be paras(params)
app.use(methodOverride("_method"));              //use method-override
app.engine("ejs", ejsMate);                      //use layout templating
app.use(express.static(path.join(__dirname, "/public")));   // use static files for i.e style.css

const dbUrl = process.env.ATLASDB_URL;
main()                         
  .then(() => {
    console.log("Connect to DataBase..");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
})


const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};

//Basic api
// app.get("/", (req, res) => {
//   res.send("Hi! I am root");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());       //Configuring Strategy
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async(req, res) => {
//   let fakeUser = new User({
//     email: "zaidansari@gmail.com",
//     username: "zaid ansari",
//   });
//   let registeredUser = await User.register(fakeUser, "passwOrd");
//   res.send(registeredUser);
// });



//Use All ListingRouter (./routes/listing.js)>>>>>>>>>>>>>>>>>>>>
app.use("/listings", listingRouter);

//Use ReviewRouter (./routes/review.js)>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/listings/:id/reviews", reviewRouter)

//Use UserRouter (./routes/user.js)>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/", userRouter);




//Route for unvalid URL 
app.get("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found :("));
})

//Custom Error Handling Rout
app.use((err, req, res, next) => {
  let{statusCode = 500, message = "Something went wrong!"} = err;
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(message);
});


//Test Listings
// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "my new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful Testing");
// });

//Port 

//Create Port
app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});