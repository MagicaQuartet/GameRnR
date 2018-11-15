const connection = require('./mysql.js');
const route = require('./route.js');
const express = require('express');
const app = express();

app.use('/', route);

app.listen(1234, function() {
	console.log('Game RnR app listening on port 1234!');
});