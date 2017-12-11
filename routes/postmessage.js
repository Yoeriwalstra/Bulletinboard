module.exports = (app, client) =>{
	app.get("/postmessage", (req, res) => {
		if(req.session.user) {
			res.render("postmessage", {user: req.session.user})
		}
	})

	app.post("/postmessage", (req, res) => {
		let title = req.body.title
		let body = req.body.body
		let user = req.session.user
	
		client.query(`INSERT INTO messages (title, body, user_id) VALUES ('${title}', '${body}', (SELECT id FROM users WHERE username = '${user.name}'));`)
			.then((result) => {
				res.redirect('/')
			})
			.catch((err) => {
				console.log("The error", err)
				res.status(500).end(err)
			})
	})
}