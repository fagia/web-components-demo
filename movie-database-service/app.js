const express = require('express');

const appName = 'Movie database service';
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(`Hello ${appName}!`));

app.listen(port, () => console.log(`${appName} started`));
