import os

given_string1 = \
"CREATE DATABASE IF NOT EXISTS game_rnr;\n\
USE game_rnr;\n\
\n\
DROP TABLE IF EXISTS user_review;\n\
DROP TABLE IF EXISTS all_games;\n\
CREATE TABLE IF NOT EXISTS all_games (\n\
    id		bigint(20)	unsigned	NOT NULL,\n\
    name	VARCHAR(50)	NOT NULL,\n\
    rating	bigint(24)	NOT NULL,\n\
    num     bigint(20)  NOT NULL,\n\
    PRIMARY KEY (id)\n\
);\n\
CREATE TABLE IF NOT EXISTS user_review (\n\
    rid		bigint(20)	unsigned	NOT NULL	AUTO_INCREMENT,\n\
    gid		bigint(20)	unsigned	NOT NULL,\n\
    name	VARCHAR(50)	NOT NULL,\n\
    rating	float(24)	NOT NULL,\n\
    PRIMARY KEY	(rid),\n\
    FOREIGN KEY (gid) REFERENCES all_games(id)	\n\
);\n"

given_string2 = \
"CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY '1234';\n\
GRANT ALL PRIVILEGES ON game_rnr.user_review TO 'user'@'localhost';\n"

with open("gamedb.sql", "w") as sql_file:
    sql_file.write(given_string1+given_string2)
    # insert gid into all_games
    with open("./game_id.txt", "r") as tag_file:
        for line in tag_file:
            tmp, name, _ = line.rstrip().split('"')
            gid, p, num, _ = tmp.split(',')
            string_to_write = \
                "INSERT INTO all_games(id, name, rating, num) VALUES(%s, \"%s\", %s, %s);\n" % (gid, name, p, num)
            sql_file.write(string_to_write)
    # with each file
    for file in os.listdir("./data/"):
        # create tag tables
        file_name = file.split(".")[0]
        string_to_write = \
"\nCREATE TABLE IF NOT EXISTS %s (\n\
    tid     bigint(20)  unsigned    NOT NULL    AUTO_INCREMENT,\n\
    gid     bigint(20)  unsigned    NOT NULL,\n\
    PRIMARY KEY (tid),\n\
    FOREIGN KEY (gid) REFERENCES all_games(id)\n\
);\n" % file_name
        sql_file.write(string_to_write)
        # insert data into the table
        with open("./data/"+file, "r") as tag_file:
            for line in tag_file:
                gid = line.rstrip()
                string_to_write = "INSERT INTO %s(gid) VALUES(%s);\n" % (file_name, gid)
                sql_file.write(string_to_write)
        # break
