const db = require('../db')

const resultsModel = {
    getAllResults: new Promise((resolve, reject) => {
        db.all('SELECT id, question, options, votes, settings FROM polls', [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    }),
    getResults: async ({id}) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT id, question, options, votes, settings FROM polls WHERE id = ?', [id], (err, row) => {
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