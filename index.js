const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user')
mongoose.connect('mongodb://localhost/logistics')
    .then(() => { console.log("Database connection established") })
    .catch(() => { console.log("Database connection failed") })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.post('/', (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({
        email: email,
        password: password
    })

    newUser.save()
        .then((data) => { console.log("User created successfully", data) })
        .catch((err) => { console.log("Error creating user", err) });
    res.redirect('/index')
})

app.get('/reset', (req, res) => {
    res.render('reset')
})

app.get('/login', (req, res) => {
    res.render('login')
})


app.listen(3000, () => {
    console.log("Server listening at port 3000...")
});