module.exports = (app, client) =>{
	
	app.get('/signup', (req, res) => {
		res.render('signup')
	})

	app.post("/signup", (req, res) => {
		let email = req.body.email
		let username = req.body.username
		let password = req.body.password
		
		client.query(`INSERT INTO users (email, username, password) VALUES ('${email}', '${username}', '${password}');`)
			.then((result) => {
				res.redirect('/')
			})
			.catch((err) => {
				console.log(err)
				res.status(500)
			})
		})
}