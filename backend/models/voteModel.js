const db = require('../db')

const voteModel = {
    getVotes: async ({ id }) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT votes FROM polls WHERE id = ?', [id], (err, row) => {
                err ? reject(err) : resolve(row)
            })
        })
    },
    submitVote: ({ id, option }) => {
        db.run('UPDATE polls SET votes = ? WHERE id = ?', [option, id], err => {
            if (err) {
                console.log(err)
            }
        })
    }
}

module.exports = voteModel