var mongodb = require('mongodb');
var User = require('./models/user')
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config')
module.exports = function(app, db) {
    // Connect to a collection from our database;
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

    /****************************************************************************************************
    ** SERVER ROUTES
    ** Here we have the server routes where we handle API calls, authentication routes, etc.
    ***************************************************************************************************** */

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


    /****************************************************************************************************
    ** When I call this route '/api/bancuri' the code within it will execute.
    ***************************************************************************************************** */
    // Sample API route.
    app.get('/api/getEntries', function(req, res) {

        // use mongoDB Driver to get all bancs in the database;
        posts.find().toArray(function(err, items) {
            "use strict";

            if (err) throw err;

            console.log("Found " + items.length + " definitii");

            res.json(items);

        });
    });

    // API route to insert a new entry.
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


    // API route to delete a new entry.
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

    // API route to edit a new entry.
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


    /****************************************************************************************************
    ** FRONTEND ROUTES
    ** This route will handle all Angular requests.
    ** Here we are saying: "whatever the request route is, send the ./app/index.html file"
    ** And from inside this index.html file Angular will take over.
    ***************************************************************************************************** */
    app.get('*', function(req, res) {
        res.sendfile('./dist/index.html'); // Load our 'public/index.html' file.
    });

};
