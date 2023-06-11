let express = require('express');
let app = express();

app.get('/', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Olá</h1>');

});

module.exports = app;