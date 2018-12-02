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
	if (/[^a-zA-Z0-9 ]+/.test(req.query.name) == false) {
		connection.query('SELECT * FROM user_review WHERE name LIKE \'%'+req.query.name+'%\'ORDER BY rating DESC;', function (err, rows) {
			if (err) throw err;
			res.send(rows);
		})
	}
});

router.get('/listGame', function (req, res) {
	if (/[^a-zA-Z0-9 ]+/.test(req.query.name) == false) {
		connection.query('SELECT * FROM all_games WHERE name LIKE \'%'+req.query.name+'%\';', function (err, rows) {
			if (err) throw err;
			res.send(rows);
		})
	}
});

router.post('/writeReview', function (req, res) {
	var duplicate = false;

	connection.query('SELECT * FROM user_review WHERE name=\''+req.body.name+'\';', function (err, rows) {
		if (err) throw err;
		if (rows.length > 0)
			duplicate = true;
	})

	selectQuery = 'SELECT id FROM all_games WHERE all_games.name=\''+req.body.name+'\';';

	connection.query(selectQuery, function (err, row) {
		if (err) throw err;
		console.log(row);
		
		if (duplicate) {
			updateQuery = 'UPDATE user_review SET rating='+req.body.rating+' WHERE name=\''+req.body.name+'\';'

			connection.query(updateQuery, function (err, rows) {
				if (err) throw err;
			})
		}
		else {
			insertQuery = 'INSERT INTO user_review (gid, name, rating) VALUES ('
							+ row[0].id + ', "'
							+ req.body.name + '", '
							+ req.body.rating + ');';

			connection.query(insertQuery, function (err, rows) {
				if (err) throw err;
			});
		}
	});
});

router.post('/deleteReview', function (req, res) {
	deleteQuery = 'DELETE FROM user_review WHERE name=\''+req.body.name+'\';';

	connection.query(deleteQuery, function (err, rows) {
		if (err) throw err;
	})
});

module.exports = router;