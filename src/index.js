const app = require('./server');
require('./database');

app.listen(app.get('PORT'), () => {
  console.log('Server Started');
});
