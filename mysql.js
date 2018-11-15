const mysql = require('mysql');

const connection = mysql.createConnection({
	host       : 'localhost',
	port       : 3306,
	user		   : 'user',
	password   : '1234',
	database   : 'game_rnr',
});

connection.connect();
module.exports = connection;