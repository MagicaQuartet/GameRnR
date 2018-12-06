const connection = require('./mysql.js');
const route = require('./route.js');
const express = require('express');
const app = express();

app.use('/', route);

app.listen(3000, function() {
	console.log('Game RnR app listening on port 3000!');
});