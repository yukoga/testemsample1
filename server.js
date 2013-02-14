var app = require('http').createServer(handler),
	fs = require('fs'),
	url = require('url'),
	qstring = require('querystring'),
	documentroot = 'contents/',
  testdir = "test/";

	app.listen(8012);

	function handler(req, res){
    dispatcher(req, res);
	}

  function dispatcher(req, res){
    var flag = 0;
    if (req.url != '/favicon.ico') {
      var qry = url.parse(req.url).query;
      console.log("path is " + url.parse(req.url).path);
      if (qry) {
          qry = qry.split('&');
          var param = new paramHash();
          for (var i=0; i<qry.length; i++) {
            param.push(qry[i].split('=')[0], qry[i].split('=')[1]);
          }
      }
      console.log(req.url + " : " + param);
      if (param && param.test) {
        runTest(req, res);
      } else {
        loadContents(req, res);
      }
    }
  }

  function runTest(req, res) {
    var fileName = getTestPath(req);
    loadFile(fileName, res);
  }

  function loadContents(req, res) {
    var fileName = getContentsPath(req);
    loadFile(fileName, res);
  }

  function getTestPath(req) {
    return getFilePath(req, testdir, "tests.html");
  }

  function getContentsPath(req) {
    return getFilePath(req, documentroot, "index.html");
  }

  function getFilePath(req, dir, defaultfile) {
		var fileName;
		var reqObj = url.parse(req.url);
		var tmppath = reqObj.pathname.replace(/^[\/]/, '');
		if (!tmppath) {
			fileName = dir + defaultfile;
		} else {
			fileName = documentroot + tmppath;
		}
    return fileName;
  }

  function loadFile(path, res){
		fs.readFile(path, function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + path);
			}
			res.writeHead(200);
			res.end(data);
		});
  }

  function paramHash() {
  }
  paramHash.prototype.push = function(key, value) {
    if (!this[key]) this[key] = value;
  }
  paramHash.prototype.get = function(key) {
    return this[key];
  }
  paramHash.prototype.remove = function(key) {
    this[key] = undefined;
  }
  paramHash.prototype.update = function(key, value) {
    if (this[key] != undefined) this[key] = value;
  }
console.log('Server started...');
