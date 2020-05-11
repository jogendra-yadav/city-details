var mysql = require('mysql');

var dbConnectionObj = require("./db-connection.js");

module.exports = function(sql){
    return new Promise((resolve, reject) => {
        dbConnectionObj.query(sql, function (err, result) {
          if (err) reject(err);
          resolve(result);
        });
    });         
}