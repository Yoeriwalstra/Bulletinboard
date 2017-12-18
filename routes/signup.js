module.exports = (app, client, bcrypt) =>{
	
	app.get('/signup', (req, res) => {
		res.render('signup')
	})

	app.post("/signup", (req, res) => {
		let email = req.body.email
		let username = req.body.username
		let password = req.body.password

		bcrypt.hash(password, 10, (err, hash) => {
			client.query(`INSERT INTO users (email, username, password) VALUES ('${email}', '${username}', '${hash}');`)
				.then((result) => {
					res.redirect('/')
				})
				.catch((err) => {
					console.log(err)
					res.status(500)
				})
			})
		})
}