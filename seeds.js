var mongoose    = require("mongoose"),
	Campgrounds = require("./models/campground.js"),
	Comment     = require("./models/comments.js");

var data = [
{
	title:"Cedar Park Camp Trail",
	image:"https://images.unsplash.com/photo-1533086723868-6060511e4168?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	description:"Fun place at cedar park to camp"
},{
	title:"Mountain Trail",
	image:"https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	description:"It is a mountain and you would enjoy the camp out here"
},{
	title:"Rocky Mountain Trail",
	image:"https://images.unsplash.com/photo-1546811740-23e671faf31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	description:"Rocky Mountain are the best place to have fun and enjoy"
}];
function seedDB() {


Campgrounds.deleteMany({}, function(err) {
	// if(err){
	// 	console.log(err);
	// } else {
	// 	data.forEach(function(camp) {
	// 		Campgrounds.create(camp,function(err,campground) {
	// 			if(err) {
	// 				console.log(err);
	// 			} else {
	// 				Comment.create({
	// 					text: "This place is great and enjoying the most",
	// 					author:"Homer"
	// 				}, function(err,comment) {
	// 					if(err) {
	// 						console.log(err);
	// 					} else {
	// 						campground.comments.push(comment);
	// 						campground.save();
	// 					}
	// 				})
	// 			}
	// 		})	 
	// 	})
	// }
});
}


module.exports = seedDB;