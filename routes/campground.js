var express          = require("express"),
	router           = express.Router(),
	Campground       = require("../models/campground"),
	middleware       = require("../middleware");

//show all the cvar routeampgrounds available
router.get("/",function(req,res) {
	// find all the campgrounds added
	Campground.find({},function(err,allCampgrounds) {
		if(err){
			console.log("error");
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

//Create new campgrounds using POST request
router.post("/",middleware.isLoggedIn,function(req,res) {
	var title = req.body.title;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username
	}
	var newCamp = {title: title,image:image,description:description,author:author};
	//create new campground 
	Campground.create(newCamp,function(err,campground) {
		if(err) {
			console.log(err);
		} else {
			//redirect to the view page
			req.flash("success","Campground was created successfully");
			res.redirect("/campgrounds");
		}
	});
	
});

// New - to show a form to create new campgrounds
router.get("/new",middleware.isLoggedIn,function(req,res) {
	//show the form page to enter the details
	res.render("campgrounds/new");
});

//show information about one campground
router.get("/:id", function(req,res){
	//Show details of one campground
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
	
});

//edit campground to show edit form
router.get("/:id/edit",middleware.campgroundOwnership, function(req,res) {
	Campground.findById(req.params.id, function(err,foundCamp) {
		if(err) {
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/edit",{campground:foundCamp});
		}
	})
});

//update campground route
router.put("/:id",middleware.campgroundOwnership, function(req,res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,foundCamp) {
		if(err) {
			res.redirect("/campgrounds")
		} else {
			req.flash("success","Campground was edited successfully");
			res.redirect("/campgrounds/"+foundCamp._id);
		}
	})
});


//Destroy campground route

router.delete("/:id",middleware.campgroundOwnership, function(req,res) {
	Campground.findByIdAndDelete(req.params.id, function(err) {
		if(err) {
			res.redirect("/campgrounds")
		} else {
			req.flash("success","Campground was deleted successfully");
			res.redirect("/campgrounds/");
		}
	})
});



module.exports = router;
