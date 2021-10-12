const db = require('../db')

const manageModel = {
    createPoll: ({id, question, options, votes, settings}) => {
        db.run('INSERT INTO polls(id, question, options, votes, settings) VALUES (?, ?, ?, ?, ?)', [
            id, question, options, votes, settings
        ], err => {
            if (err) {
                console.log(err)
            }
        })
    }
}

module.exports = manageModel