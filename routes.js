var mongodb = require('mongodb');
var User = require('./models/user')
var Message = require('./models/message')
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config')
var mongoose = require('mongoose');

module.exports = function(app, db) {

	/*
	|--------------------------------------------------------------------------
	| DB COLLECTIONS
	|--------------------------------------------------------------------------
	*/
	var posts = db.collection("NMAstarterkit");


	/*
	|--------------------------------------------------------------------------
	| Login Required Middleware
	|--------------------------------------------------------------------------
	*/
	function ensureAuthenticated(req, res, next) {
		if (!req.headers.authorization) {
			return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
		}
		var token = req.headers.authorization.split(' ')[1];

		var payload = null;
		try {
			payload = jwt.decode(token, config.TOKEN_SECRET);
		}
		catch (err) {
			return res.status(401).send({ message: err.message });
		}

		if (payload.exp <= moment().unix()) {
			return res.status(401).send({ message: 'Token has expired' });
		}
		req.user = payload.sub;
		next();
	}


	/*
	 |--------------------------------------------------------------------------
	 | Generate JSON Web Token
	 |--------------------------------------------------------------------------
	 */
	function createJWT(user) {
		var payload = {
			sub: user._id,
			iat: moment().unix(),
			exp: moment().add(14, 'days').unix()
		};
		return jwt.encode(payload, config.TOKEN_SECRET);
	}

	app.param('messageId', messageById);

	app.get('/api/message/:messageId', function(req, res){
		console.log('get message messageId');
		console.log('req.message',req.message)
		res.json(req.message);
	})



	function messageById(req, res, next, id) {
		console.log('id',id);
		if (!mongoose.Types.ObjectId.isValid(id)) {
			 console.log('!Valid');
			return res.status(400).send({
			  message: 'Article is invalid'
			});
		  } else {
			console.log('Valid');
		  Message.findById(id, function(err, message) {
			if (err) {
			  return next(err);
			} else if (!message) {
				console.log('!message');
			  return res.status(404).send({
				message: 'No article with that identifier has been found'
			  });
			}
			console.log('message',message);
			req.message = message;
			next();
		})
	  }
	}

	/****************************************************************************************************
	*****************************************************************************************************
	**
	**      SERVER ROUTES
	**      Here we have the server routes where we handle API calls, authentication routes, etc.
	**
	*****************************************************************************************************
	***************************************************************************************************** */

	/*
	 |--------------------------------------------------------------------------
	 | LOGIN
	 |--------------------------------------------------------------------------
	 */
	app.post('/auth/login', function(req, res) {
		User.findOne({ email: req.body.email }, '+password', function(err, user) {
			if (!user) {
				return res.status(401).send({ message: 'Invalid email and/or password' });
			}
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (!isMatch) {
					return res.status(401).send({ message: 'Invalid email and/or password' });
				}
				res.send({ token: createJWT(user) });
			});
		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | Create Email and Password Account
	 |--------------------------------------------------------------------------
	 */
	app.post('/auth/signup', function(req, res) {
	  User.findOne({ email: req.body.email }, function(err, existingUser) {
		if (existingUser) {
		  return res.status(409).send({ message: 'Email is already taken' });
		}
		console.log()
		var user = new User({
		  displayName: req.body.displayName,
		  email: req.body.email,
		  password: req.body.password
		});
		user.save(function(err, result) {
		  if (err) {
			res.status(500).send({ message: err.message });
		  }
		  res.send({ token: createJWT(result) });
		});
	  });
	});


    app.get('/api/getEntries/getItemCount', function(req, res) {
        console.log('getItemCount');
        db.collection('items').find().toArray(function(err, items) {
            "use strict";

            if (err) throw err;

            console.log("Found " + items.length + " items");

            res.json(items.length);

        });
    });

    app.param('pageNumber', function(req, res, next, pageNumber) {
        console.log('pageNumber',pageNumber);
        req.pageNumber = pageNumber;
        console.log('req.pageNumber',req.pageNumber);
        next();
    })

    app.param('itemsPerPage', function(req, res, next, itemsPerPage) {
        console.log('itemsPerPage',itemsPerPage);
        req.itemsPerPage = itemsPerPage;
        console.log('req.itemsPerPage',req.itemsPerPage);
        next();
    })

    app.get('/api/getEntries/getItems/:itemsPerPage/:pageNumber', function(req, res) {
        console.log('getItems/:itemsPerPage >> ',req.itemsPerPage);
        console.log('getItems/:pageNumber >> ',req.pageNumber);
        var itemsPerPage = parseInt(req.itemsPerPage);
        var pageNumber = parseInt(req.pageNumber);
        db.collection('items').find().skip(itemsPerPage*(pageNumber - 1)).limit(itemsPerPage).toArray(function(err, items) {
            "use strict";

            if (err) throw err;
            for(var i = 0; i<items.length; i++) {
                console.log('timestamp : ', mongoose.Types.ObjectId(items[i]._id).getTimestamp());
            }

            console.log("Found " + items.length + " items");

            res.json(items);

        });
    });


	/*
	 |--------------------------------------------------------------------------
	 | POST MESSAGE
	 |--------------------------------------------------------------------------
	 */
	app.post('/api/newMessage', function(req, res, next) {

		console.log('req.body',req.body);
		var message = new Message({
			from: req.body.from,
			date: req.body.date,
			subject: req.body.subject,
			body: req.body.body
		})

		Message.create(message, function (err, inserted) {
			if(err) {
				console.log(err.message);
				return db.close();
			}
			console.log("inserted",inserted);
			res.json(inserted);
			console.dir("Successfully inserted: "+ JSON.stringify(inserted));
			//JSON.stringify is to actually get the json representation of this JavaScript object.

		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | GET MESSAGES
	 |--------------------------------------------------------------------------
	 */
	app.get('/api/unreadMessages', function(req, res) {

		// use mongoDB Driver to get all bancs in the database;
		Message.findUnreadMessages(function(err, items) {
			"use strict";

			if (err) throw err;

			console.log("Found " + items.length + " definitii");
			console.log('items',items);

			res.json(items);
		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | NR. MESSAGES
	 |--------------------------------------------------------------------------
	 */
	app.get('/api/numberOfUnreadMessages', function(req, res) {

		// use mongoDB Driver to get all bancs in the database;
		Message.findUnreadMessages(function(err, items) {
			"use strict";

			if (err) throw err;

			console.log("Found " + items.length + " definitii");
			console.log('items',items);

			res.json(items.length);
		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | GET ENTRY
	 |--------------------------------------------------------------------------
	 */
	app.get('/api/getEntries', function(req, res) {

		// use mongoDB Driver to get all bancs in the database;
		posts.find().toArray(function(err, items) {
			"use strict";

			if (err) throw err;

			console.log("Found " + items.length + " definitii");

			res.json(items);

		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | POST ENTRY
	 |--------------------------------------------------------------------------
	 */
	app.post('/api/PostNewEntry', function(req, res, next) {

		var doc = req.body;

		posts.insert(doc, function (err, inserted) {
			if(err) {
				console.log(err.message);
				return db.close();
			}
			res.json(inserted);
			console.dir("Successfully inserted: "+ JSON.stringify(inserted));
			//JSON.stringify is to actually get the json representation of this JavaScript object.

		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | DELETE ENTRY
	 |--------------------------------------------------------------------------
	 */
	app.put('/api/deletePost', function(req, res, next) {

		console.log("req.body: ",req.body._id)
		var id = req.body._id;

		posts.remove({_id: new mongodb.ObjectID(id) }, function(err, removed) {
			if (err) {
				console.log("Error processing request. Cannot find user with this id.");
			}
			//console.log("User has been found. Processing request ...");
			console.log("deleted",removed)
			res.json(removed)
		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | EDIT ENTRY
	 |--------------------------------------------------------------------------
	 */
	app.put('/api/editPost', function(req, res, next) {

		console.log("req.body: ",req.body.obj)

		console.log('id: '+ req.body.obj.entryId)

		posts.update({_id: new mongodb.ObjectID(req.body.obj.entryId) },{$set:{cuvant : req.body.obj.doc.cuvant, definitia : req.body.obj.doc.definitia, categoria : req.body.obj.doc.categoria}}, function(err, objectFound) {
			if (err) {
				console.log("Error processing request. Cannot find user with this id.");
			}
			//console.log("User has been found. Processing request ...");
			console.log("objectFound",objectFound)
			res.json(objectFound)
		});
	});


	/*
	 |--------------------------------------------------------------------------
	 | SEND TEXT
	 |--------------------------------------------------------------------------
	 */
	app.post('/api/sendText', function(req, res) {
		console.log("req.body: ",req.text.text)
	});



	/****************************************************************************************************
	*****************************************************************************************************
	**
	**      FRONTEND ROUTES
	**      This route will handle all Angular requests.
	**      Here we are saying: "whatever the request route is, send the ./app/index.html file"
	**      And from inside this index.html file Angular will take over.
	**
	*****************************************************************************************************
	***************************************************************************************************** */
	app.get('*', function(req, res) {
		res.sendfile('./dist/index.html'); // Load our 'public/index.html' file.
	});

};
