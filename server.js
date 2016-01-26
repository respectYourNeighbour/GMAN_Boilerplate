/**************************************
*************** Modules ***************
*** get a reference to the modules ****
****************************************/

var express        = require('express'); // Express is a library for NodeJS which handles for us a lot of routing and a lot of details of a web application.
var app            = express(); // We create an instance of our app;
var MongoClient    = require('mongodb').MongoClient; //This is the MongoDB Driver for NodeJS. It is a (JavaScript) library(module) that will handle the (BSON) protocol . We will use this driver's API to actually connect to MongoDB. This driver will do the communication with the database, the opening sockets, reading documents, detecting the errors, it will handle a lot of the things behind the scene so that we don't have to deal with them in our application code.
//** MongoClient - From the module 'mongodb' we get the MongoClient object. This object is our interface into the 'mongodb' driver library. Through this MongoClient object we will access the API methods to the driver wich will then handle whatever operation we requested.
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');


/********************************************
*************** Configuration ***************
********************************************* */
var port = process.env.PORT || 8080; // We set the port on which our application will run.

mongoose.connect('mongodb://127.0.0.1/NMAstarterkit');
var db = mongoose.connection;
db.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});
db.on('connected', function () {
    "use strict" //
    console.log("connection on connected");


    // get all data/stuff of the body (POST) parameters ===========================================
	app.use(bodyParser.json()); // parse application/json ;
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

	app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
	app.use(express.static(__dirname + '/dist')); //We set the static files location '/app'

	// routes ==================================================

	require('./routes')(app, db); // We are passing our application into our routes;

	// start app ===============================================
	app.listen(port);
	console.log('Magic happens on port ' + port); 			// We shout out to the user the port on which the application is running.
	exports = module.exports = app; 						// We expose our app.

});


/********************************************
*************** Documentation ***************
********************************************* */

//*********** Database Connection ***********

// MongoClient.connect('mongodb://localhost:27017/NMAstarterkit', function (err, db) { ...

// We connect to the Mongo Server and to our local database (in this case our db name is 'NMAstarterkit' - NodeMongoAngularStarterKit);
// This will open the connection to the Server. Instead of checking the return value, we pass a callback function (function (err, db));
// The first parameter in the callback function is to take the errors, and the second parameter is for the returned values.
// The driver connects to the 'mongod' instance and it will call the callback function after it connects;
// Because we dont check the return values, we need a way for the driver to tell us what happened and give us the results of this connection attempt;
// If there is an error, the parameter 'err' will get populated.
// If the connection is succesful, the driver will call this callback that we passed in with the connected database object;
// The second argument 'db' is like a handle for our database connection.
// From now on, in this function (this callback)  we can use this database object ('db') to perform operations using this allready connected client.
