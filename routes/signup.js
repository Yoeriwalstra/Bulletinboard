module.exports = (app, client) =>{
	
	app.get('/signup', (req, res) => {
		res.render('signup')
	})

	app.post("/signup", (req, res) => {
		let firstname = req.body.firstname
		let lastname = req.body.lastname
		let email = req.body.email
		let password = req.body.password
		
		client.query(`INSERT INTO users (firstname, lastname, email, password) VALUES ('${firstname}', '${lastname}', '${email}', '${password}');`)
			.then((result) => {
				res.redirect('/')
			})
			.catch((err) => {
				console.log(err)
				res.status(500)
			})
		})
}