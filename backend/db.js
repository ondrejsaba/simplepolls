const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.log(err.message)
    }
})

module.exports = db