/**************************************
*************** Modules ***************
*************************************** */
var express        = require('express');
var app            = express();
var MongoClient    = require('mongodb').MongoClient;
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');


/********************************************
*************** Configuration ***************
********************************************* */
var port = process.env.PORT || 8083; // We set the port on which our application will run.

// We connect to our local database (in this case our db name is 'personale');
MongoClient.connect('mongodb://localhost:27017/personale', function (err, db) {
    "use strict" //
    if(err) throw err;

    // get all data/stuff of the body (POST) parameters ===========================================
	app.use(bodyParser.json()); // parse application/json ;
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

	app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
	app.use(express.static(__dirname + '/public')); // We set the static files location '/public'

	// routes ==================================================
	require('./app/routes')(app, db); // Pass our application into our routes;

	// start app ===============================================
	app.listen(port);	
	console.log('Magic happens on port ' + port); 			// We shout out to the user the port on which the application is running.
	exports = module.exports = app; 						// We expose our app.

});

