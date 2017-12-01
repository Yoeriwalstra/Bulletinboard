//NOT IN APP.JS???
const pg = require('pg')
const Client = pg.Client
require('dotenv').load();


/*const client = new Client({
	user: process.env.pgusername,
	host: 'localhost',
	database: process.env.database,
	password: process.env.password,
	port: 5432,
})
*/

module.exports = {
	initialize: initialize(
		client = new Client ({
		host: "localhost", 
		username: process.env.pgusername,
		password: process.env.password, 
		database: process.env.database
	})),
	findAllMsgs: function (table, cb) {
		client.query(`SELECT * FROM '${table}'`)
		.then((result) => {
			res.render('showmessage', {data: result})
		})
		.catch((err) => {
			console.log(err)
		})
	},
	findMsgsById: function(table, id, cb) {
		client.query(`SELECT * FROM '${table}' WHERE id = '${id}'`)
		//return should be something like: {firstname: 'Sint', lastname: 'Klaas', email:'sint@sint.sint'}
		.then((result) => {
			res.render('showmessage', {data: result})
		})
		.catch((err) => {
			console.log(err)
		})
	},
	findMsgsByUsername: function(table, username, cb) {
		client.query(`SELECT * FROM '${table}' WHERE username = '${username}'`)
		.then((result) => {
			res.render('showmessage', {data: result})
		})
		.catch((err) => {
			console.log(err)
		})
	}
}