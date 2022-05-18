const app = require('./app/server');
port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})