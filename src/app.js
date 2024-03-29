const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { createErrorResponse } = require('./response');
const bodyParser = require('body-parser');

const app = express(); //routes
app.use(helmet()); //security
app.use(cors()); //x-origin
app.use(compression()); //compression for middlware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).json(createErrorResponse(
     404, 'not found'
  ));
});


module.exports = app;