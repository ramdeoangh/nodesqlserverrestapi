'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var sqlconfig = require("./config");
var app = express();
//2.
//var config = {
//    server: '127.0.0.1',
//    database: 'AdventureWorks2016CTP3',
//    user: 'sa',
//    password: 'Ramdeo123!@#',
//    port: 1433
//};
app.use(bodyParser.json());
app.use(function (req, res, next) {
    //enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App running on port", port);
});
function executeQuery(req, res, query) {
    var dbConn = new sql.Connection(sqlconfig); //This is just an instance and not connecting to db
    dbConn.connect().then(function () {
        //6.
        var request = new sql.Request(dbConn);
        //7.
        request.query(query).then(function (recordSet) {
            console.log(recordSet);
            res.send(recordSet);
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });
}
//10.
app.get("/api/user", function (req, res) {
    var query = "SELECT * FROM [HumanResources].[vEmployeePersonTemporalInfo]";
    executeQuery(req, res, query);
});
//# sourceMappingURL=server.js.map