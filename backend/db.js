const sqlite3 = require('sqlite3')

const openMode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
let db = new sqlite3.Database('./db/database.db', openMode, err => {
    if (err) {
        console.log(err.message)
    }
})

module.exports = db