const express = require('express');
const app = express();
app.set('view engine', 'pug')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
const pg = require('pg')
const Client = pg.Client
require('dotenv').load();
// const myOrm = require('./myOrm')
//const client = myOrm.initialize()

const client = new Client({	
	host: 'localhost',
	user: process.env.pgusername,
	password: process.env.password, 
	database: process.env.database,
	port: 5432
})

client.connect()

//Make a .env file, install it in npm in the work directory (AND ADD IT TO YOUR .GITIGNORE, because it is meant to hide your password e.d.)
// The client is a 'server-client'; Node.js making a request to a database.

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/signup', (req, res) => {
	res.render('signup')
})

app.get('/showmessage', (req, res) => {
	client.query("SELECT * FROM messages")
		.then((result) => {
			res.render('showmessage', {data: result})
		})
		.catch((result) => {
			console.log(err)
			res.status(500).end(err)
		})
})

app.post("/sendmessage", (req, res) => {
	let title = req.body.title
	let body = req.body.message
	
	client.query(`INSERT INTO messages (title, body) VALUES ('${title}', '${body}')`)
		.then((result) => {
			res.redirect('/showmessage')
		})
		.catch((result) => {
			console.log(err)
			res.status(500).end(err)
		})
})


app.post("/signupuser", (req, res) => {
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



let server = app.listen(3000, () => {
	console.log('Listening at port 3000')
});