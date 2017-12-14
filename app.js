//Require all neccessary packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const pg = require('pg')
const Client = pg.Client
require('dotenv').load();
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended:true}))

//Create new client object 
const client = new Client({	
	host: 'localhost',
	user: process.env.pgusername,
	password: process.env.password, 
	database: process.env.database,
	port: 5432
})

//Set cookie encryption for express-session
let sess = {
	secret: process.env.secret,
	cookie: {}
}

//Connect to database
client.connect()

//Call variable with cookie encryption on express-session package
app.use(session(sess))
	
require("./routes/index.js")(app, client)
require("./routes/signup.js")(app, client)
require("./routes/login.js")(app, client)
require("./routes/profile.js")(app, client)
require("./routes/postmessage.js")(app, client)
require("./routes/searchresult.js")(app, client)
require("./routes/logout.js")(app)



let server = app.listen(process.env.webport, () => {
	console.log(`Listening at port ${process.env.webport}`)
});