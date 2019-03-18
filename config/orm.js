// ====================== DEPENDENCIES ======================
var connection = require("../config/connection.js");

// ================ HELPER FXNs FOR SQL SYNTAX ==============
// (Adapted from 14.3 16-MvcExample in-class activity)

// Corrects MySQL question mark syntax in query statements 
function handleQuestionMarks(query) {
    var arr = [];
  
    for (var i = 0; i < query; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Corrects object key/value pairs to SQL syntax
  function objectToSql(obj) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string into arr
    for (var key in obj) {
      var value = obj[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(obj, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// ==== OBJECT TO EXECUTE MYSQL COMMANDS IN CONTROLLERS ====
var orm = {
    // Retrieve all information from database
    selectAll: function(tableName, cb) {
        var queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    // Store new entry into database
    insertOne: function(tableName, col, vals, cb) {
        var queryString = "INSERT INTO " + tableName + " (" + col.toString(); + ") ";
        queryString += "VALUES (" + handleQuestionMarks(vals.length) + ") ";

        console.log(queryString);

        // This will allow the database to search the query with the value from the client/user input
        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    // Update an existing entry in database
    updateOne: function(tableName, objectCols, specLocation, cb) {
        var queryString = "UPDATE " + tableName;
        queryString += " SET " + objectToSql(objectCols);
        queryString += " WHERE " + specLocation;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

// ====================== EXPORT ORM ======================
module.exports = orm;