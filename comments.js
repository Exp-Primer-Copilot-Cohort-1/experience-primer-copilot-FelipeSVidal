// Create web server
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

// DB connection
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'root',
	database : 'jsman',
});

connection.connect();

// URL routing
router.post('/form', function(req, res) {
	console.log(req.body.email);
	// res.send("<h1>welcome " + req.body.email + "</h1>");
	res.render('email.ejs', {
		'email' : req.body.email
	});
});

router.post('/ajax', function(req, res) {
	var email = req.body.email;
	var responseData = {};

	var query = connection.query('select name from user where email="' + email
			+ '"', function(err, rows) {
		if (err)
			throw err;
		if (rows[0]) {
			console.log(rows[0].name);
			responseData.result = "ok";
			responseData.name = rows[0].name;
		} else {
			console.log("none : " + rows[0]);
			responseData.result = "none";
			responseData.name = "";
		}
		res.json(responseData);
	});
});

module.exports = router;