var express     = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	mongoose    = require("mongoose"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comments.js"),
	flash       = require("connect-flash")
	passport    = require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override");
	User        = require("./models/user"),
	seedDB      = require("./seeds");

var campgroundRoute = require("./routes/campground");
var commentRoutes = require("./routes/comment");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});

app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

//passport configurations

app.use(require("express-session")({
	secret:"important message",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
 	next();
});

//route use in app

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoutes);

//seedDB(); //-- seed file


app.listen("3000",function() {
	console.log("The YelpCamp server was started");
});

