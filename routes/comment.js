var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware");

// new route to show comment creation form
router.get("/new",middleware.isLoggedIn, function(req,res) {
	Campground.findById(req.params.id, function(err,campground) {
		if(err) {
			res.redirect("/campgrounds");
		} else {
			res.render("comments/new",{campground:campground});
		}
	});
});

//create new comment
router.post("/",middleware.isLoggedIn, function(req,res) {
	
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment,function(err,newComment) {
				if(err) {
					console.log(err);
				} else {
					//Add the username associated with the comments to comments 
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					//Push comments to campground 
					campground.comments.push(newComment);
					campground.save();
					req.flash("success","Comment was added successfully");
					res.redirect("/campgrounds/"+campground._id);
				}
			})		
		}
	})
});

//put route for displaying comment edit form
router.get("/:comment_id/edit",middleware.commentAuthorization, function(req,res) {
	Comment.findById(req.params.comment_id, function(err,comment) {
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit",{campground_id: req.params.id, comment: comment});
		}
	});
	
});
//update comment route
router.put("/:comment_id",middleware.commentAuthorization, function(req,res) {
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err,comment) {
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success","Comment was edited successfully");
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
	
});

//delete route for comment

router.delete("/:comment_id",middleware.commentAuthorization, function(req,res) {
	Comment.findByIdAndDelete(req.params.comment_id, function(err) {
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success","Comment was deleted successfully");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})


module.exports = router;