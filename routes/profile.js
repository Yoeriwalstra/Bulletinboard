module.exports = (app, client) => {
	app.get("/profile", (req, res) => {
		if(req.session.user) {
			client.query(`SELECT * FROM messages WHERE user_id=(SELECT id FROM users WHERE username = '${req.session.user.name}')`)
			.then((result) => {
				res.render('profile', {data: result, user: req.session.user})
			})
			.catch((err) => {
				console.log("ERROR", err)
			})
		}
		else {
			res.status(400).end()
		}
	})
}