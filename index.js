const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const mongoose = require('mongoose');
mongoose.connect(
  process.env.DB_URI,
  {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
.catch(error => console.error(error));

// Add authentication modules
const passport = require('passport');
const session = require('express-session');
app.use(session({
  secret: "My Secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTStrategy({
  secretOrKey: "My Secret",
  jwtFromRequest: ExtractJWT.fromExtractors([
    ExtractJWT.fromUrlQueryParameter('secret_token'),
    ExtractJWT.fromBodyField('secret_token')
  ])
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

const routes = require('./routes');
const router = routes(express.Router());
app.use(router);

const { handle404s, errorHandler } = require('./errorHandling');
app.use(handle404s);
app.use(errorHandler);

app.listen(
  process.env.PORT,
  () => console.log(`On port ${process.env.PORT}`)
);