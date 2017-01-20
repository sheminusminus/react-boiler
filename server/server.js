var path = require('path');

const PORT = 3000;

const express = require('express');

var bodyParser = require('body-parser');

const serveStatic = require('serve-static');

const app = express();

app.use(serveStatic('dist', {'index': ['index.html']}));

app.get('/yo', function (req, res) {
  res.send('yo\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);