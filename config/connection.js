var mysql = require("mysql");

var connectionInfo = process.env.JAWSDB_URL || {
    host: "localhost",
    port: 3306, 
    user: "root",
    password: "Password123",
    database: "burgers_db"
}

var connection = mysql.createConnection(connectionInfo);

connection.connect( function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;