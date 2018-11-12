const mysql = require('mysql');

const connection = mysql.createConnection({
	host		: 'localhost',
	port		: 3306,
	user		: 'user',
	password	: '1234',
	database	: 'game_rnr',
});

connection.connect();

const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(1234, function() {
	console.log('Game RnR app listening on port 1234!');
})

// Routing
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.post('/insertAPI', function (req, res) {
	selectQuery = 'SELECT id FROM all_games WHERE all_games.name="'+req.body.name+'";';

	connection.query(selectQuery, function (err, row) {
		if (err) throw err;
		console.log(row);
		
		insertQuery = 'INSERT INTO user_review (gid, name, rating) VALUES ('
						+ row[0].id + ', "'
						+ req.body.name + '", '
						+ parseFloat(req.body.rating) + ');';

		connection.query(insertQuery, function (err, rows) {
			if (err) throw err;
			console.log(rows);
			res.redirect('/');
		});
	});
});

app.get('/reviews', function (req, res) {
	res.sendFile(__dirname + "/result.html");
});

app.get('/listAPI', function (req, res) {
	connection.query('SELECT * FROM user_review', function (err, rows) {
		if (err) throw err;
		res.send(rows);
	})
});