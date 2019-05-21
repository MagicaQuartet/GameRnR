const path = require('path');
const connection = require('../config/mysql.js');

export.index = function index(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
};

