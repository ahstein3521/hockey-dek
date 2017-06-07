const app = require('./server/index');
const port = process.env.PORT || 4000;

app.listen(port , function(){
  console.log('Listening');
});
