const db = require('../db')

const manageModel = {
    pollWithIdExists: async ({id}) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT EXISTS(SELECT * FROM polls WHERE id = ?)'

            db.get(query, [id], (err, row) => {
                const exists = parseInt(Object.values(row).join('')) ? true : false

                err ? reject(err) : resolve(exists)
            })
        })
    },
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