//Modules
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
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy
    //import Routes
const defaultRoutes = require('./routes/default/default.routes')
const authRoutes = require('./routes/auth/auth.routes')

//Connect Database
mongoose.connect('mongodb://localhost/waawtube')
    .then((connected) => { console.log("Database connection established") })
    .catch((err) => { console.log("Database connection failed") })

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
}))

app.use(logger('dev'));
app.use(flash());

/* Routes Grouping*/

app.use(defaultRoutes);

app.use(authRoutes);

//Catch 404 and forward to error handler

app.use((req, res, next) => {
    res.render('error404');
    next();
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port 3000...")
});