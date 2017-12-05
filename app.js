const express = require('express');
const app = express();
app.set('view engine', 'pug')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
require('dotenv').load();
let myOrm = require('./myOrm')

const client = myOrm.initialize({	
	host: 'localhost',
	user: process.env.pgusername,
	password: process.env.password, 
	database: process.env.database,
	port: 5432
})


	
//Make a .env file, install it in npm in the work directory (AND ADD IT TO YOUR .GITIGNORE, because it is meant to hide your password e.d.)
// The client is a 'server-client'; Node.js making a request to a database.

require("./routes/index.js")(app)
require("./routes/showmessage.js")(app, myOrm)
require("./routes/sendmessage.js")(app, client)
require("./routes/signup.js")(app, client)



let server = app.listen(3000, () => {
	console.log('Listening at port 3000')
});