var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');
var util = require('util');
var formidable = require('formidable');
var multer = require('multer');



router.get('/', function(req, res, next) {
	res.render('data_makeBy');
});

router.post('/', function(req, res, next) {

	var form = new formidable.IncomingForm();
	form.uploadDir = './public/xml';
	form.keepExtensions = true;
	form.parse(req,function(err, fields, files) {
		var response = '';
		if (JSON.stringify(files) == '{}') {
			response = {
				"name":fields.name,
				"type":fields.type,
				"version":fields.version,
				"content":fields.content
			};
		} else {
			var filePath = files.file.path;
			content = fs.readFileSync(filePath,'utf-8');
			if (content != fields.content) {
				res.send('faild');
			}
			response = {
				"name":fields.name,
				"type":fields.type,
				"version":fields.version,
				"content":content
			}
		};
		res.json(response);

	});

});

module.exports = router;
