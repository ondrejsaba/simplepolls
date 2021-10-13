const db = require('../db')

const voteModel = {
    getVotes: async ({ id }) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT votes FROM polls WHERE id = ?', [id], (err, row) => {
                err ? reject(err) : resolve(row)
            })
        })
    },
    voteGetIps: async ({ id }) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT ips FROM polls WHERE ID = ?', [id], (err, row) => {
                err ? reject(err) : resolve(row)
            })
        })
    },
    submitVote: ({ id, ips, votes }) => {
        db.run('UPDATE polls SET votes = ?, ips = ? WHERE id = ?', [votes, ips, id], err => {
            if (err) {
                console.log(err)
            }
        })
    }
}

module.exports = voteModel