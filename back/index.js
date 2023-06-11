const express = require('express');
const bodyParser = require('body-parser');
let routesIndex = require('./routes/index');
let routesContas = require('./routes/contas');
var cors = require('cors')



let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use(routesIndex);
app.use('/contas',routesContas);


app.listen(3000, '127.0.0.1', () => {

    console.log("servidor rodando!");

});