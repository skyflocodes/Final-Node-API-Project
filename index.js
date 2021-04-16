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