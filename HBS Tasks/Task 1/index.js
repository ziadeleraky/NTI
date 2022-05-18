const app = require('./frontend/app');
const port = process.env.port || 4000;


app.listen(port, () => {
  console.log('Server is now running on port No. ' + port);
})