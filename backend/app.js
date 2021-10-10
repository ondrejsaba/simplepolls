const express = require('express')
const cors = require('cors')
const manageRoutes = require('./routes/manageRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/manage', manageRoutes)

app.use('*', (req, res) => {
    res.status(404)
})

app.listen(3000)