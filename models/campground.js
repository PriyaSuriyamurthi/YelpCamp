var mongoose = require("mongoose");
//Schema Setup 

var campgroundSchema = new mongoose.Schema({
	title: String,
	image: String,
	description:String,
	author: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	},
	comments: [{
		type:mongoose.Schema.Types.ObjectId,
		ref : "Comment"
	}]
});
module.exports = mongoose.model("campground",campgroundSchema);