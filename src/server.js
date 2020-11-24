require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 3334);

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(require('./routes/file'));

module.exports = app;
