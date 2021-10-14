const db = require('../db')

const resultsModel = {
    getAllResults: new Promise((resolve, reject) => {
        const query = 'SELECT id, question, options, votes, settings FROM polls'

        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    }),
    getResults: async ({id}) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, question, options, votes, settings FROM polls WHERE id = ?'

            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
    }
}

module.exports = resultsModel