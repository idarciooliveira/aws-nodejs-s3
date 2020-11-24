const mongoose = require('mongoose');

module.exports = mongoose.model(
  'file',
  mongoose.Schema({
    filenames: [String],
    urls: [String],
    description: String,
  })
);
