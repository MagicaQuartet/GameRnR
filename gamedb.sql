CREATE DATABASE IF NOT EXISTS game_rnr;
USE game_rnr;

DROP TABLE IF EXISTS user_review;
DROP TABLE IF EXISTS all_games;
CREATE TABLE IF NOT EXISTS all_games (
	id		bigint(20)	unsigned	NOT NULL	AUTO_INCREMENT,
	name	VARCHAR(50)	NOT NULL,
	rating	float(24)	NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS user_review (
	rid		bigint(20)	unsigned	NOT NULL	AUTO_INCREMENT,
	gid		bigint(20)	unsigned	NOT NULL,
	name	VARCHAR(50)	NOT NULL,
	rating	float(24)	NOT NULL,
	PRIMARY KEY	(rid),
	FOREIGN KEY (gid) REFERENCES all_games(id)	
);
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON game_rnr.user_review TO 'user'@'localhost';

INSERT INTO all_games(name, rating) VALUES('Portal 2', 97.23);
INSERT INTO all_games(name, rating) VALUES('Factorio', 96.41);
INSERT INTO all_games(name, rating) VALUES('The Witcher 3: Wild Hunt', 96.33);
INSERT INTO all_games(name, rating) VALUES('Counter-Strike', 96.08);
INSERT INTO all_games(name, rating) VALUES('Portal', 96.07);
INSERT INTO all_games(name, rating) VALUES('Terraria', 95.87);
INSERT INTO all_games(name, rating) VALUES('The Binding of Isaac: Rebirth', 95.85);
INSERT INTO all_games(name, rating) VALUES('Left 4 Dead 2', 95.62);