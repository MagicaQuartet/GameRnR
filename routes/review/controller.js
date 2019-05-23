const path = require('path');
const connection = require('../../configs/mysql.js');
const testPattern = /[^a-zA-Z0-9 ':,!-&]+/;

exports.index = function reviewIndex(req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'review.html'));
};

exports.show = function showReview(req, res) {
  if (testPattern.test(req.query.name) === false) {
    req.query.name = req.query.name.replace(/'/, "\\'");
    connection.query(`SELECT * FROM user_review WHERE name LIKE '%${req.query.name}%' ORDER BY rating DESC;`, function(err, rows) {
      if (err) throw err;
       res.send(rows);
    });
  }
};

exports.game = function showGame(req, res) {
  if (testPattern.test(req.query.name) == false) {
    req.query.name = req.query.name.replace(/'/, "\\'");
    connection.query(`SELECT * FROM all_games WHERE name LIKE '%${req.query.name}%';`, function (err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  }
};

exports.write = function writeReview(req, res) {
  let duplicate = false;
	req.body.name = req.body.name.replace(/'/, "\\'");

	connection.query(`SELECT * FROM user_review WHERE name='${req.body.name}';`, function (err, rows) {
		if (err) throw err;
		if (rows.length > 0)
			duplicate = true;
	})

	selectQuery = `SELECT id FROM all_games WHERE all_games.name='${req.body.name}';`;

	connection.query(selectQuery, function (err, row) {
		if (err) throw err;
		
		if (duplicate) {
			updateQuery = `UPDATE user_review SET rating=${req.body.rating} WHERE name='${req.body.name}';`

			connection.query(updateQuery, function (err, rows) {
				if (err) throw err;
			})
		}	else {
			insertQuery = `INSERT INTO user_review (gid, name, rating) VALUES (${row[0].id}, '${req.body.name}', ${req.body.rating});`;

			connection.query(insertQuery, function (err, rows) {
				if (err) throw err;
			});
		}
	});
};

exports.delete = function deleteReview(req, res) {
  req.body.name = req.body.name.replace(/'/, "\\'");
	deleteQuery = `DELETE FROM user_review WHERE name='${req.body.name}';`;

	connection.query(deleteQuery, function (err, rows) {
		if (err) throw err;
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify({ status: "OK" }));
	res.end();
};
