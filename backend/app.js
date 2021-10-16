const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')

const fs = require('fs')
const asyncDb = require('./asyncDb')

const initSql = fs.readFileSync('./db/init.sql').toString()

const startServer = () => {
    const manageRoutes = require('./routes/manageRoutes')
    const voteRoutes = require('./routes/voteRoutes')
    const resultsRoutes = require('./routes/resultsRoutes')
    
    app.use(cors())
    app.use(express.json())

    app.use('/manage', manageRoutes)
    app.use('/vote', voteRoutes)
    app.use('/results', resultsRoutes)

    app.use('*', (req, res) => {
        res.status(404)
    })

    app.listen(process.env.PORT, err => {
        if (!err) {
            console.log('Listening on port ' + process.env.PORT + '...')
        }
    })
}

asyncDb.then(db => {
    db.run(initSql, [], err => {
        if (err) {
            console.log(err)
        } else {
            startServer()
        }
    })
})