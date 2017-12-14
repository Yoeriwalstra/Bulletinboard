module.exports = (app, client) => {
	

	app.post("/searchresult", (req, res) => {
		let suggestion = req.body.suggestion
		// console.log(suggestion)
		client.query(`
				SELECT messages.title, messages.body, users.username 
				FROM messages 
				LEFT JOIN users 
				ON messages.user_id = users.id 
				WHERE messages.title LIKE '%${suggestion}%' OR users.username = '${suggestion}';`
				)
			.then((result) => {
				console.log('this is the whole result:', result)
				res.render('searchresult', {
					data: result,
					suggestion: suggestion
				})
			})
			.catch((err) => {
				console.log(err)
				res.send('No.')
			})
	})
}