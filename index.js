/*
 npm run start:dev
*/

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Must first load the models
require('./models/card');

// put request body to req.body
app.use(bodyParser.json({limit: '50mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));

app.use(function (req, res) {
  res.status(404).send({ message: 'Opppps.... wrong way!' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

/**
 * -------------- SERVER ----------------
 */

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
