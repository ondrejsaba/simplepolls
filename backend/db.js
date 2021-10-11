const sqlite3 = require('sqlite3')
const fs = require('fs')

let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Connected to the database.')
    }
})

const initSql = fs.readFileSync('./db/init.sql').toString()

db.run(initSql, [], err => {
    if (err) {
        console.log(err)
    }
})

module.exports = db