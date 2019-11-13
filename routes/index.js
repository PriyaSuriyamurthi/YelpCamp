var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Landing page
router.get("/", function(req,res) {
	res.render("landing");
});

//register route form page
router.get("/register", function(req,res){
	res.render("user/register");
});

// register route for storing register details
router.post("/register", function(req,res) {
	var newUser = new User({username: req.body.username});
	var password = req.body.password;
	User.register(newUser, password, function(err,user) {
		if(err) {
			req.flash("error",err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success","Welcome to YelpCamp "+user.username);
			res.redirect("/campgrounds");
		})
	})
});

//login route form page
router.get("/login", function(req,res){
	res.render("user/login");
});

// login route 
router.post("/login",passport.authenticate("local",{
		successRedirect: "/campgrounds",
		failureRedirect:"/login"
}), function(req,res) {	
});

router.get("/logout", function(req,res) {
	req.logout();
	req.flash("success","you have been logged out");
	res.redirect("/campgrounds");
})


module.exports = router;
