//NOT IN APP.JS???
const pg = require('pg')
const Client = pg.Client
require('dotenv').load();
var client= {}

/*const client = new Client({
	user: process.env.pgusername,
	host: 'localhost',
	database: process.env.database,
	password: process.env.password,
	port: 5432,
})
*/

module.exports = {

	initialize: function(connectionObject) {
		client = new Client (connectionObject)
		client.connect()
		return client
	},

	findAllMsgs: function (table, cb) {
		client.query(`SELECT * FROM messages`)
		.then((result) => {
			cb(result)
		})
		.catch((err) => {
			console.log(err)
		})
	},

	findMsgsById: function(table, id, cb) {
		client.query(`SELECT * FROM '${table}' WHERE id = '${id}'`)
		.then((result) => {
			cb(result)
		})
		.catch((err) => {
			console.log(err)
		})
	},

	findMsgsByUsername: function(table, username, cb) {
		client.query(`SELECT * FROM '${table}' WHERE username = '${username}'`)
		.then((result) => {
			cb(result)
		})
		.catch((err) => {
			console.log(err)
		})
	}
}