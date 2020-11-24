require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')));
app.set('PORT', process.env.PORT || 3333);
app.use(
  multer({ dest: path.resolve(__dirname, '..', 'upload', 'temp') }).array(
    'files',
    5
  )
);

app.use(require('./routes/file'));

module.exports = app;
