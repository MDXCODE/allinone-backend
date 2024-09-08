const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { createErrorResponse } = require('./response');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use(helmet()); 

app.use(compression()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).json(createErrorResponse(
    404, 'Not found'
  ));
});

module.exports = app;
