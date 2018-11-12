# GameRnR

Reference: [https://github.com/SuminHan/CS360_tutorial](https://github.com/SuminHan/CS360_tutorial)

Toy website for game review &amp; recommendation

* Node.js + Express.js
* MySQL

### Setting

To initialize database, run the **gamedb.sql** on mysql.

This will create database called **game_rnr** and create tables called 
**all_games** and **user_review**. 
Also, the sql script creates new user called 'user'@'localhost' with password '1234'.

Then, install the node modules:
	
	$ npm install

Now, run the server.

	$ node app.js
	Game RnR app listening on port 1234!