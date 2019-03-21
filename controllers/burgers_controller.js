// ====================== DEPENDENCIES ======================
var express = require("express");

// Importing the burger model to implement its db fxns
var burger = require("../models/burger.js");

// ========================= ROUTES =========================
// Create routes & within the routes, is the logic 
// required to connect the backend to the front end 

var router = express.Router();

// Call allBurgers method belonging to burger object to get all burgers stored in db
router.get("/", function(req, res) {
    burger.allBurgers(function(burgerData) {
        // Store all burgers in db in an object to use with handlebars template
        var hbsBurgers = {
            burgers: burgerData
        };
        console.log(hbsBurgers);
        // Render index.handlebars with db information 
        res.render("index", hbsBurgers);
    });
});

// Call insertBurger method belonging to burger object to allow user to post a new burger to db
router.post("/api/burgers", function(req, res) {
    burger.insertBurger(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        // Have the result of the new burger added sent back as a json object with the id of the new entry row
        res.json({ id: result.insertId });
    });
});

// Call updateBurger method belonging to burger object to allow user to update an existing burger
router.put("/api/burgers/:id", function(req, res) {
    // "Grab" the ID of the exisiting burger user wants to update
    // Store in variable:
    var specLocation = "id = " + req.params.id;
    console.log("specLocation is: " + specLocation);

    // Only need to worry about updating if burger is devoured or not
    burger.updateBurger({ devoured: req.body.devoured }, specLocation, function(result) {
        if (result.changedRows === 0) {
            // Handle errors
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var specLocation = "id = " + req.params.id;

    burger.delete(specLocation, function(result) {
        if (result.affectedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      });
});

// ====================== EXPORT ======================
module.exports = router;
