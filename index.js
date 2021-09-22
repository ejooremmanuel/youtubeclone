//Modules
const { globalVariables } = require('./config/default/global.config');
const express = require('express');
const ejs = require('ejs');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');

//Configuration

//Connect Database
mongoose.connect('mongodb://localhost/waawtube')
    .then((connected) => { console.log("Database connection established") })
    .catch((err) => { console.log("Database connection failed") });

//Configure Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Set up cookie and session
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: Date.now() + 360000 * 24 * 60 * 60 },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/waawtube',
        ttl: 14 * 24 * 60
    })
}));


//Set up passport and session
app.use(passport.initialize());
app.use(passport.session());

//set up passport local strategy to authenticate log in

app.use(logger('dev'));
app.use(flash());
app.use(globalVariables);


/* Routes Grouping*/
//import Routes
const defaultRoutes = require('./routes/default/default.routes');
const authRoutes = require('./routes/auth/auth.routes');
const videoRoutes = require('./routes/video/video.routes');
app.use('/', defaultRoutes);
app.use('/auth', authRoutes);
app.use('/video', videoRoutes);



//Catch 404 and forward to error handler

app.use((req, res, next) => {
    res.render('error404');
    next();
});


// app.use(function(req, res, next) {
//     // catch 404 and forward to error handler
//     next(createError(404));
// });

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port 3000...");
});