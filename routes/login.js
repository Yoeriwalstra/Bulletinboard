module.exports = (app, client, bcrypt) => {
	app.get("/login", (req, res) => {
		res.render("login")
	})

	app.post("/login", (req, res) => {
		let username = req.body.username
		let password = req.body.password

		client.query(`SELECT * FROM users WHERE username = '${username}'`)
		.then((result) => {
			if(result.rows.length === 0) {
				//change this with ajax so that page doesnt have to refresh/redirect
				res.redirect("/signup")
			}
			//When nothing is in rows, rows.password will crash code
			else if(result.rows.length > 0) {
				bcrypt.compare(password, result.rows[0].password, (err, compareResult) => {
					if (err) {
						res.end()
						throw err
					}
					else if (compareResult) {
					req.session.user = {name: `${username}`}
					res.end()
					res.redirect("/profile")
					}
				})
			}
			else {
				res.end()
				//change this with ajax so that page doesnt have to refresh/redirect
				res.redirect("/signup")
			}
		})
		.catch((err) => {
			console.log(err)
		})
	})
}