const express = require('express');
const bodyParser = require('body-parser');
const router = require('../src/router/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.listen(8080);