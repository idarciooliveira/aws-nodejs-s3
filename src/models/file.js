const mongoose = require('mongoose');

module.exports = mongoose.model(
  'file',
  mongoose.Schema({
    filename: [String],
    description: String,
    url: String,
  })
);
