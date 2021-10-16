const sqlite3 = require('sqlite3')

const asyncDb = new Promise((resolve, reject) => {
	const openMode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
	let db = new sqlite3.Database('./db/database.db', openMode, err => {
	    if (err) {
	        reject(err)
	    } else {
	        resolve(db)
	    }
	})
})

module.exports = asyncDb