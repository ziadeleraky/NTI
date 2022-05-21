require('dotenv').config();
const app = require('./app/app');

app.listen(process.env.port, () => {
    console.log(`http://localhost:${process.env.port}`);
});