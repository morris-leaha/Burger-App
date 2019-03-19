// ====================== DEPENDENCIES ======================
var orm = require("../config/orm.js");

// Burger object with methods to call the ORM functions 
var burger = {
    allBurgers: function(cb) {
        orm.selectAll("burgers", function(result) {
            cb(result);
        });
    },
    // Supplying the tableName, but needs columns & values to update
    // Callback fxn will be defined later in controllers
    insertBurger: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(result) {
            cb(result);
        });
    }, 
    // Supplying the tableName, but needs object key/value pairs (columns and values) & where to update
    // Callback fxn will be defined later in controllers
    updateBurger: function(objectCols, specLocation, cb) {
        orm.updateOne("burgers", objectCols, specLocation, function(results) {
            cb(result);
        });
    }
};

// ====================== EXPORT ======================
module.exports = burger;