module.exports = (app, client) => {
	app.get("/", (req, res) => {
		client.query('SELECT messages.user_id, messages.title, messages.body, users.username FROM messages LEFT JOIN users ON messages.user_id = users.id;')
		.then((result) => {
			// console.log(result)
		res.render('index', {data: result, user: req.session.user})
		})
		.catch((err) => {
			console.log(err)
		})
	})
}