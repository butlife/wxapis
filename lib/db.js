var mongo = require('mongoskin');
var config = require('../config');
var mongourl = +config.dbuser + ":" + config.dbpwd + "@120.194.50.197:27017/caiji?auto_reconnect";
var db = mongo.db(mongourl);


exports.insert_caipiao = function (type, issue, riqi, number) {
    db.collection('caipiao').count({type: type, issue: issue}, function (err, num) {
        if (err) return;
        if (num == 0) {
            db.collection('caipiao').insert({"type": type, "issue": issue, "riqi": riqi, "number": number}, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('插入' + type, issue);
                }

            });
        }
    });
}
exports.find = function (callback) {
    var all = '';
    db.collection('token').find().toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        } else {
            for (var i in result) {
                all += result[i].id + ',';
                if (i == result.length - 1) {
                    callback(all);
                }
            }
        }


    });
}
exports.update = function (tokenid, msgid, callback) {
    db.collection('token').update({"id": tokenid}, {$set: {"msgid": msgid}}, {upsert: true}, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            callback();

        }

    });

}

exports.finderr = function (msgid, callback) {
    var all = '';
    db.collection('token').find({"msgid": {$ne: msgid}}).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return;
        } else {
            for (var i in result) {
                all += result[i].id + ',';
                if (i == result.length - 1) {
                    callback(all);
                }
            }
        }
    });
}