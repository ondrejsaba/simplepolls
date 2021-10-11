const db = require('../db')

const resultsModel = {
    getAllResults: new Promise((resolve, reject) => {
        db.all('SELECT * FROM polls', [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    }),
    getResults: async ({id}) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM polls WHERE id = ?', [id], (err, row) => {
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