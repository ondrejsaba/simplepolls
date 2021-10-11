const db = require('../db')

const manageModel = {
    createPoll: ({id, question, options, settings}) => {
        db.run('INSERT INTO polls VALUES (?, ?, ?, ?)', [
            id, question, options, settings
        ], err => {
            if (err) {
                console.log(err)
            }
        })
    }
}

module.exports = manageModel