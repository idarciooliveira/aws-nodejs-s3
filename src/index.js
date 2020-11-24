const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
  console.log('Server Started at ' + app.get('port'));
});
