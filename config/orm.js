// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
  var arr = [];

  for (var key in obj) {
    var value = obj[key];
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: (tableInput, callback) => {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, res) {
      if (err) {
        throw err;
      }
      callback(res);
    });
  },
  create: (table, cols, vals, callback) => {
    console.log(table);
    console.log(cols);
    console.log(vals);
    console.log(callback);
    var queryString = "INSERT INTO " + table +
      " (" + cols.toString() + ") " +
      "VALUES (" + printQuestionMarks(vals.length) + ") ";
    console.log("------------------------00000-----------------------------------");
    


    connection.query(queryString, vals, function (err, res) {
      if (err) {
        throw err;
      }

      callback(res);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: (table, objColVals, condition, callback) => {
    var queryString = "UPDATE " + table +
      " SET " + objToSql(objColVals) +
      " WHERE " + condition;

    console.log(queryString);
    connection.query(queryString, function (err, res) {
      if (err) {
        throw err;
      }

      callback(res);
    });
  },
  delete: (table, condition, callback) => {
    var queryString = "DELETE FROM " + table +
      " WHERE " + condition;

    console.log(queryString);
    connection.query(queryString, function (err, res) {
      if (err) {
        throw err;
      }

      callback(res);
    });
  }
};

module.exports = orm;
