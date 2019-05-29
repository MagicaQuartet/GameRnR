const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const index = require('./routes/index/index');
const review = require('./routes/review/index');
const recommendation = require('./routes/recommendation/index');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', index);
app.use('/review', review);
app.use('/recommendation', recommendation);

app.listen(3000, '0.0.0.0', function() {
	console.log('Game RnR app listening on port 3000!');
});
