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
	if (/[^a-zA-Z0-9 ':,!-&]+/.test(req.query.name) == false) {
		req.query.name = req.query.name.replace(/'/, "\\'");
		connection.query('SELECT * FROM user_review WHERE name LIKE \'%'+req.query.name+'%\'ORDER BY rating DESC;', function (err, rows) {
			if (err) throw err;
			res.send(rows);
		})
	}
});

router.get('/listGame', function (req, res) {
	if (/[^a-zA-Z0-9 ':,!-&]+/.test(req.query.name) == false) {
		req.query.name = req.query.name.replace(/'/, "\\'");
		connection.query('SELECT * FROM all_games WHERE name LIKE \'%'+req.query.name+'%\';', function (err, rows) {
			if (err) throw err;
			res.send(rows);
		})
	}
});

router.get('/listRecommendation', function (req, res) {
	var tagQuery = (tag) => 'SELECT tag.gid AS id, SUM(r.rating-5) AS score\
													FROM user_review AS r, '+tag+' AS tag\
													WHERE EXISTS (SELECT *\
																				FROM '+tag+' AS f\
																				WHERE r.gid=f.gid)\
													GROUP BY id\
													HAVING NOT EXISTS (SELECT *\
															  						 FROM user_review AS r2\
															  						 WHERE tag.gid=r2.gid)'


	var tagQueryList = [tagQuery('2d'), tagQuery('RPG'), tagQuery('action'),
											tagQuery('adventure'), tagQuery('arcade'), tagQuery('atmospheric'),
											tagQuery('casual'), tagQuery('difficult'), tagQuery('earlyaccess'),
											tagQuery('fps'), tagQuery('freetoplay'), tagQuery('gore'),
											tagQuery('indie'), tagQuery('massivelymultiplayer'), tagQuery('openworld'),
											tagQuery('puzzle'), tagQuery('racing'), tagQuery('scifi'),
											tagQuery('simulation'), tagQuery('singleplayer'), tagQuery('sports'),
											tagQuery('storyrich'), tagQuery('strategy'), tagQuery('survival'),
											tagQuery('violent')];


	var union = tagQueryList.join(' UNION ');
	var totalScoreQuery = 'SELECT result.id AS id, SUM(result.score) AS score\
										 FROM ('+union+') AS result\
										 GROUP BY result.id'

	var resultQuery = 'SELECT g.name AS name, (r.score*g.rating*0.01) AS score\
										 FROM all_games AS g, ('+totalScoreQuery+') AS r\
										 WHERE g.id=r.id AND r.score > 0\
										 ORDER BY score DESC\
										 LIMIT 10;'

	connection.query(resultQuery, function (err, rows) {
		if (err) throw err;
		console.log(rows);
		res.send(rows);
	})
});

router.post('/writeReview', function (req, res) {
	var duplicate = false;
	req.body.name = req.body.name.replace(/'/, "\\'");

	connection.query('SELECT * FROM user_review WHERE name=\''+req.body.name+'\';', function (err, rows) {
		if (err) throw err;
		if (rows.length > 0)
			duplicate = true;
	})

	selectQuery = 'SELECT id FROM all_games WHERE all_games.name=\''+req.body.name+'\';';

	connection.query(selectQuery, function (err, row) {
		if (err) throw err;
		
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
	req.body.name = req.body.name.replace(/'/, "\\'");
	deleteQuery = 'DELETE FROM user_review WHERE name=\''+req.body.name+'\';';

	connection.query(deleteQuery, function (err, rows) {
		if (err) throw err;
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify({ status: "OK" }));
	res.end();
});

module.exports = router;