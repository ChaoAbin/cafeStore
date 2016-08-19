var express = require('express');
var router = express.Router();
var User = require('../model/userM');

/* GET users listing. */
router.get('/test', function(req, res, next) {
	var newUser = User({
	  name: 'Peter Quill',
	  username: 'BFDFDDSDSS',
	  password: 'password',
	  admin: true
	});

	// save the user
	newUser.save(function(err) {
	  if (err) throw err;

	  console.log('User created!');
	});

	res.json({ title: 'Express' });
});

/* POST creat or update */
router.post('/', function(req, res, next) {

	/*
	var newUser = User({
	  name: 'Peter Quill',
	  username: 'BFDFDDSDSS',
	  password: 'password',
	  admin: true
	});

	// save the user
	newUser.save(function(err) {
	  if (err) throw err;

	  console.log('User created!');
	});
	*/
	res.json({ title: 'Express' });
});

module.exports = router;
