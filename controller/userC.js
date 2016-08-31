var express = require('express');
var router = express.Router();
var User = require('../model/userM');

/**
	會員清單
*/ 
router.get('/', function (req, res) {
	User.find({}, function(err, users) {
		var userMap = [];
		console.log(users);
		users.forEach(function(user) {
			userMap.push(user);
		});

		res.send(userMap);  
	});
});

/**
	取得會員資料
	@parmas id userId
*/ 
router.get('/:id', function (req, res) {
	User.findById(req.params.id, function(err, user) {
	if (err)
		res.send(err);
		res.send(user);
	});
});

/**
	更新多筆會員資料
	@parmas arrayObject 會員資訊
	arrayObject = [{
		_id: 1,
		name: 'Peter Quill',
		username: 'BFDFDDSDSS',
		password: 'password',
		admin: true
	}]
*/ 
router.put('/', function (req, res) {
	req.body.forEach(function(element, index){
		var user = User.findById(element["_id"], function(err, user) {
			if (err) {
				res.send(err);
				return handleError(err);
			}
			for(var key in element){
				user[key] = element[key];
			}
			user.save(function (err) {
				if (err) {
					res.send(err);
					return handleError(err);
				}
			});
		});
	});

	res.send(true);
});

/**
	更新會員資料
	@parmas id userId
	@parmas json 會員資訊
	json = {
		name: 'Peter Quill',
		username: 'BFDFDDSDSS',
		password: 'password',
		admin: true
	}
*/ 
router.put('/:id', function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) return handleError(err);

		for(var key in req.body){
			user[key] = req.body[key];
		}

		user.save(function (err) {
			if (err) return handleError(err);
			res.send(user);
		});
	});
});

/**
	新增多筆會員
	@pramas json 會員資訊
	@return error/sucess msg 新增結果
		json = {
		name: 'Peter Quill',
		username: 'BFDFDDSDSS',
		password: 'password',
		admin: true
	}
*/ 
router.post('/', function(req, res) {
	for(var i=0;i<req.body.length;i++) {
		var newUser = User(req.body[i]);
		// save the user
		newUser.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.send(newUser);
		});
	}
});

/**
	新增會員
	@pramas json 會員資訊
	@return error/sucess msg 新增結果
	json = {
		name: 'Peter Quill',
		username: 'BFDFDDSDSS',
		password: 'password',
		admin: true
	}
*/ 
router.post('/:id', function(req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) return handleError(err);

		if(user == null) {
			var newUser = User(req.body);
				// save the user
				newUser.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.send(newUser);
			});
		} else {
			for(var key in req.body){
				user[key] = req.body[key];
			}

			user.save(function (err) {
				if (err) return handleError(err);
				res.send(user);
			});
		}
	});
});

/**
	刪除會員
	@pramas id userId
	@return true/error msg 刪除結果
*/ 
router.delete('/:id', function (req, res) {
	User.findByIdAndRemove(req.params.id, function(err, user) {
		if (err)
			res.send(err);
		res.send(user);
	});
	res.send(true);
});

/**
	  刪除全部會員
	  @return true/error msg 刪除結果
*/ 
router.delete('/', function (req, res) {
	User.remove({}, function(err, user) {
		if (err)
			res.send(err);
	});
	res.send(true);
});

module.exports = router;
