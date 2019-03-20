// ============ DEPENDENCIES ============

var express = require("express");

var hbs = require("express-handlebars");

// ============ EXPRESS CONFIG ===========

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// ========= HANDLEBARS CONFIG ===========

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ============= ROUTER INFO ==============

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// ============= LISTENER INFO ==============

app.listen(PORT, function() {
    console.log("Burger-App is listening on PORT: " + PORT);
});