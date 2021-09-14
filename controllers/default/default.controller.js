module.exports = {
    home: function(req, res) {
        res.render('default/index', { pageTitle: "Home" })

    },
    posthome: (req, res) => {
        const { email, password } = req.body;
        const newUser = new User({
            email: email,
            password: password
        })

        newUser.save()
            .then((data) => { console.log("User created successfully", data) })
            .catch((err) => { console.log("Error creating user", err) });
        res.redirect('default/index')

    }
}