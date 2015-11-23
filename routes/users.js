
(function(){
    var User = require('../models/user');

    module.exports = function(app){
        /* Utility function to check if user is authenticatd */
        function requireAuth(req, res, next){
            // check if the user is logged in
            if(!req.isAuthenticated()){
                return res.sendStatus(401);
            }
            next();
        }
        
        /* Get all the users NOTE: add auth later*/ 
        app.get('/users', function (req, res, next) {
            User.find(function (err, users) {
                var parsedUsers = users;
                // Strip out the personal information from the user 
                    // Remove the password property from the user object
                res.json(parsedUsers, 200);
            });
        });
        
        /* process the submission of a new user */
        app.post('/register', function (req, res, next) {

            User.findOne({username: req.body.username}, function(err, the_user){
                if(the_user){
                    res.sendStatus(422);
                }else{
                    var user = new User(req.body);
                    var hashedPassword = user.generateHash(user.password);
                    User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword,
                        provider: 'local',
                        created: Date.now(),
                        updated: Date.now()
                    }, function (err, returnedUser) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(err, 500);
                        }
                        else {
                            console.log(returnedUser);
                            res.sendStatus(200);
                        }
                    });        
                }
            })
        });
        
        /* process the edit form submission */
        app.put('/user/:id', function (req, res) {
            var id = req.params.id;
            var user = new User(req.body);
            user.password = user.generateHash(user.password);
            user._id = id;
            user.updated = Date.now();
            
            // use mongoose to do the update
            User.update({ _id: id }, user, function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(err, 500);
                }
                else {
                    res.sendStatus(200);
                }
            });
        });
        
        /* run delete on the selected user */
        app.delete('/user/:id', function (req, res) {
            var id = req.params.id;
            User.remove({ _id: id }, function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(err, 500);
                }
                else {
                    res.sendStatus(200);
                }
            });
        });
        
        /* Process the Login Request */
        app.post('/login', function(req, res){
            var username = req.body.username;
            var password = req.body.password;
        
            User.findOne({"username": username}, function(err, user){
            if(err){
                res.sendStatus(err, 500);
            }
            
            if(user){
                if(user.validPassword(password)){
                        res.sendStatus(200); //Later send back token to angular
                }else{
                        res.sendStatus(401);
                }
            }else{
                res.sendStatus(401);
            }
            });
            
        });
    }

}())