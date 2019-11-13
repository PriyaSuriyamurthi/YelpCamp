var middleware = {};
var Campground = require("../models/campground");
var Comment = require("../models/comments");


//middleware
middleware.isLoggedIn = function(req,res,next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error","you have to Login to access");
	res.redirect("/login");
}

middleware.campgroundOwnership = function(req,res,next) {
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err,foundCamp) {
			if(err) {
				req.flash("error","Campground not found");
				res.redirect("back");
			} else {
				if(foundCamp.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error","You don't own the Campground");
					res.redirect("back");
				}
			}
			
		});
	} else {
		req.flash("error","You need to be Logged in to access it");
		res.redirect("back");
	}
}

middleware.commentAuthorization = function(req, res,next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err,comment) {
			if(err) {
				req.flash("error","Comment not found");
				res.redirect("back");
			} 
			else {
				if(comment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error","You don't own the comment");
					res.redirect("back");
				}
			} 
			
		});				 
	} else {
		req.flash("error","You need to be Logged in to access it");
		res.redirect("back");
	}
}

module.exports = middleware;