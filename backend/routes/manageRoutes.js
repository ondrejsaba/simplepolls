const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/create', (req, res) => {
    const {question, options, settings} = req.body

    const alphabet = [...Array(26).keys()].map(key => String.fromCharCode(key + 97))
    const numbers = [...Array(10).keys()]
    const possibleCharacters = [...alphabet, ...numbers]

    const pollId = [...Array(6)].map(key => {
        return possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)]
    }).join("")

    db.run('INSERT INTO polls VALUES (?, ?, ?, ?)', [
        pollId, question, JSON.stringify(options), JSON.stringify(settings)
    ], err => {
        if (err) {
            console.log(err)
        }
    })

    res.json({
        id: pollId
    })
})

module.exports = router