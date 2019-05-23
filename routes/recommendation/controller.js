const path = require('path');
const connection = require('../../configs/mysql.js');

exports.index = function recommendationIndex(req, res) {
  res.sendFile(path.join(__dirname, '../../views', 'recommendation.html'));
};

exports.show = function showRecommendation(req, res) {
  const tagQuery = function createTagQuery(tag) {
    return `SELECT tag.gid AS id, SUM(r.rating-5) AS score FROM user_review AS r, ${tag} AS tag WHERE EXISTS (SELECT * FROM ${tag} AS f WHERE r.gid=f.gid)  GROUP BY id HAVING NOT EXISTS (SELECT * FROM user_review AS r2 WHERE tag.gid=r2.gid)`;
  };

  const tagQueryList = [
    tagQuery('2d'),
    tagQuery('RPG'),
    tagQuery('action'),
    tagQuery('adventure'),
    tagQuery('arcade'),
    tagQuery('atmospheric'),
    tagQuery('casual'),
    tagQuery('difficult'),
    tagQuery('earlyaccess'),
    tagQuery('fps'),
    tagQuery('freetoplay'),
    tagQuery('gore'),
    tagQuery('indie'),
    tagQuery('massivelymultiplayer'),
    tagQuery('openworld'),
    tagQuery('puzzle'),
    tagQuery('racing'),
    tagQuery('scifi'),
    tagQuery('simulation'),
    tagQuery('singleplayer'),
    tagQuery('sports'),
    tagQuery('storyrich'),
    tagQuery('strategy'),
    tagQuery('survival'),
    tagQuery('violent')
  ];

  const union = tagQueryList.join(' UNION ');
  const totalScoreQuery = `SELECT result.id AS id, SUM(result.score) AS score FROM (${union}) AS result GROUP BY result.id`;
  const resultQuery = `SELECT g.name AS name, (r.score*g.rating*0.01) AS score FROM all_games AS g INNER JOIN (${totalScoreQuery}) AS r WHERE g.id=r.id AND r.score > 0 ORDER BY score DESC LIMIT 10;`;

  connection.query(resultQuery, function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
};
