module.exports = (app, myOrm) => {
	app.get('/showmessage', (req, res) => {
		myOrm.findAllMsgs('messages', (result) => {
		res.render('showmessage', {data: result})
		})
	})	
}