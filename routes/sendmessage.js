module.exports = (app, client) =>{
	app.post("/sendmessage", (req, res) => {
		let title = req.body.title
		let body = req.body.message
		
		client.query(`INSERT INTO messages (title, body) VALUES ('${title}', '${body}');`)
			.then((result) => {
				res.redirect('/showmessage')
			})
			.catch((err) => {
				console.log("The error", err)
				res.status(500).end(err)
			})
	})
}