const app = require('./app')
const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Connected to database.')
    }
})

app.listen(3000)