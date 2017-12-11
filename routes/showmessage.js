module.exports = (app, client) => {
	app.get('/showmessage', (req, res) => {
		client.query(`SELECT * FROM messages`)
		.then((result) => {
		res.render('showmessage', {data: result/*, user: req.session.user*/})
		})
		.catch((err) => {
			console.log(err)
		})
	})
}