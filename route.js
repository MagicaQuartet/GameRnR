const connection = require('./mysql.js');
const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(express.static(path.join(__dirname, 'html')));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: true
}));

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

router.get('/review', function (req, res) {
	res.sendFile(path.join(__dirname, 'html', 'review.html'));
});

router.get('/recommendation', function (req, res) {
	res.sendFile(path.join(__dirname, 'html', 'recommendation.html'));
});

router.get('/listReview', function (req, res) {
	connection.query('SELECT * FROM user_review ORDER BY rating DESC', function (err, rows) {
		if (err) throw err;
		res.send(rows);
	})
});

router.get('/listGame', function (req, res) {
	connection.query('SELECT * FROM all_games', function (err, rows) {
		if (err) throw err;
		res.send(rows);
	})
});

router.post('/insertAPI', function (req, res) {
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

module.exports = router;