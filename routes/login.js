var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('login');
});

router.post('/', function(req, res) {
	var request = {
		"email":req.body.email,
		"password":req.body.password
	}
	res.send(request);	
});
module.exports = router;
