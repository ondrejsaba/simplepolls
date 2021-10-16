const sqlite3 = require('sqlite3')

const asyncDb = new Promise((resolve, reject) => {
	let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, err => {
	    if (err) {
	        reject()
	    } else {
	        resolve(db)
	    }
	})
})

module.exports = asyncDb