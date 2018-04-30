//PACKAGES
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const path = require("path");

//CONTROLLERS
const ac = require(`${__dirname}/controllers/appController`);
const ic = require(`${__dirname}/controllers/intController`);



const port = 3005;

const app = express();

//SERVING PRODUCTION FILES
// app.use(express.static(`${__dirname}/..build`));

const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET
} = process.env;

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(console.log);

app.use(json());
app.use(cors());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000 //365 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/login"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuthId([profile.id, profile.displayName])
              .then(created => done(null, created[0]));
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//authentication
app.get(
  "/login",
  passport.authenticate("auth0", {
    failureRedirect: "/#/login"
  }),
  (req, res) => {
 
    res.redirect(`http://localhost:3000/#/dashboard/${req.user.name}`);
  }
);

app.get("/api/me", (req, res) => {
 
  if (req.user) res.status(200).json(req.user);
  else res.status(500).json({ message: "Please Login" });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("`http://localhost:3000/#/`");
  });
});

//ENDPOINTS
app.get('/api/application/:id', ac.getApp);//get one application
app.get('/api/applications/:id', ac.getApps);//get all applications
app.get('/api/interviews/:id', ic.getInts);//get all Interviews
// app.get('/api/companies/:id', cc.getCompanies )




//FOR PRODUCTION
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`We live on: ${port}`);
});
