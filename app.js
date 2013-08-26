var http = require("http");
var querystring = require('querystring');
var url = require("url");
var caipiao = require('./lib/caipiao');
var ems = require('./lib/ems');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html,charset=utf8'});
    req.setEncoding('utf8');
    var query = url.parse(req.url).query;
    var type = querystring.parse(query).type;

    if (type == "cp") {
        caipiao.cp(function (result) {
            console.log(result);
            res.end(result);
        })

    } else if (type == "ems") {
        var com = querystring.parse(query).com;
        var nu = querystring.parse(query).nu;
        ems.ems(com,nu,function (result) {
              res.end(result);
        })

    } else {
        res.end('end');
    }


}).listen(4000);
console.log("runing 4000")