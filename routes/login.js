module.exports = (app, client) => {
	app.get("/login", (req, res) => {
		res.render("login")
	})

	app.post("/login", (req, res) => {
		let username = req.body.username
		let password = req.body.password
		client.query(`SELECT * FROM users WHERE username = '${username}'`)
		.then((result) => {
			if(result.rows.length === 0) {
				res.redirect("/signup")
			}
			else if(result.rows.length > 0) {
				//When nothing is in rows, rows.password will crash code
				if (password === result.rows[0].password) {
					req.session.user = {name: `${username}`}
					/*res.render("profile", {user: req.session.user})*/
					res.end()
					res.redirect("profile")
				}
			}
			else {
				res.redirect("/signup")
			}
		})
		.catch((err) => {
			console.log(err)
		})
	})

}