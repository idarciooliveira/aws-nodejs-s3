const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {})
  .catch((error) => {
    throw new Error('Cannot Connect to Database' + error);
  });
