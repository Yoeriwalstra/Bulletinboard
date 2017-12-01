/*Bulletin Board Application
Create a website that allows people to post messages to a page. A message consists of a title and a body.
The site should have two pages:
- The first page shows people a form where they can add a new message.
- The second page shows each of the messages people have posted.
Make sure there's a way to navigate the site so users can access each page.

Messages must be stored in a postgres database. Create a "messages" table with three columns:
column name / column data type:
- id: serial primary key
- title: text
- body: text

Additional Grading Criteria

As before, your package.json must include the correct dependencies.

Additionally, you must configure postgres as follows:
Name your database "bulletinboard".
Your postgres username must be read from an environment variable named "POSTGRES_USER".
Your postgres password (if present) must be read from an environment variable named "POSTGRES_PASSWORD"

This will allow Lieneke to grade your assignments without having to go into your code and change your connection string to her configuration.*/

/*EXTRA CHALLENGE if you’re finished with the bulletinboard and the rest: Extend the bulletinboard with a user table and associate 
(i.e. link/ set relation) themessages with posts. Make it possible to search for all the messages of a certainuser.*/

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

console.log("USERNAME", process.env.pgusername)
const client = new Client({	
	host: 'localhost',
	username: "postgres",
	password: "123Jurgen", 
	database: "bulletinboard",
	port: 5432
})
setTimeout(function(){client.connect()
}, 2000)

//Make a .env file, install it in npm in the work directory (AND ADD IT TO YOUR .GITIGNORE, because it is meant to hide your password e.d.)
// The client is a 'server-client'; Node.js making a request to a database.

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/signup', (req, res) => {
	res.render('signup')
})

app.get('/showmessage', (req, res) => {
	client.query({text: 'SELECT * FROM messages;'}, (err, result)=> {
		if (err) {
			res.status(500).end(err)
		} else {
		console.log('hellooooo')
		res.render('showmessage', {data: result})
		}
	})
})

app.post("/sendmessage", (req, res) => {
	let title = req.body.title
	let body = req.body.message
	
	const query = {
		text: `INSERT INTO messages (title, body) VALUES ('${title}', '${body}');`
	}

	client.query(query, (err, result) => {
		if (err) {
			console.log(err)
			res.status(500).end(err)
		}
		else {
			console.log("!!!!!"+ result)
			res.redirect('/showmessage')
		}
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

// function findAllMsgs(table, cb) {
// 	client.query(`SELECT * FROM '${table}'`)
// 	.then((result) => {
// 		cb()
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	})
// }

// app.get('/showmessage', (req, res) => {
// 	// findAllMsgs('messages', function(result){
// 	// 	console.log(result)
// 	// 	res.render('showmessage',/*juiste pagina???*/ {data: result})
// 	// })


// 	// const query1 = {text: 'SELECT * FROM messages'}

// 	// client.query({text: 'SELECT * FROM messages'}, (err, result)=> {
// 	// 	if (err) {
// 	// 		res.status(500).end(err)
// 	// 	} else {
// 	// 		let msgs = result
// 	// 		console.log("yoyoyoyo")
// 	// 		// res.redirect('showmessage', {data: msgs})
// 		}
// 	})
// })

/*SAME CODE AS ABOVE (app.get(/showmessage)) BUT WITH PROMISE!

app.get('/showmessage', (req, res) => {
	const query1 = {text: 'SELECT * FROM messages;'}
	const query2 = {text: "SELECT title, body FROM messages WHERE title='Hi'"}
	
	client.query(query1)
		.then((result) => {
			console.log("The first result is: ", result)
			return client.query(query2)
		})
		.then((result2) =>{
			console.log("The second result is: ", result2)
			let msgs = result2
			res.render('showmessage', {data: msgs})
		})
		.catch((err) => {
			console.log(err)
		})
})*/

/*FROM CALLBACK TO PROMISE!!!
app.post("do all these things")
const query = "SELECT id FROM blabla WHERE user='Yoeri'"
const query1 = "SELECT messages FROM blabla"
const query2 = "blabla"

	//client.query is promise-based.
	client.query('SELECT * FROM users WHERE id=1')
		.then((result) => {
			console.log(result)
			return "this is the result parameter for the second .then-function"
		})
		.then((result1) => {
			console.log(result1)
			return client.query(query2)
		})
		.then((result2) => {
			res.render({userdata: result2})
		})
		.cath((error) => {
			console.log(error)
		})
*/


/*myOrm.findMsgsById("messages", 2, (result) => {
	//do something with result
	//for example: console.log(result)
})

myOrm.findMsgsByUsername("messages", "Yoeri", (result) => {
	//do something with result
	//for example: console.log(result)
})
*/



let server = app.listen(3000, () => {
	console.log('Listening at port 3000')
});