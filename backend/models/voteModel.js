const db = require('../db')

const voteModel = {
    getVotes: async ({ id }) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT votes FROM polls WHERE id = ?'

            db.get(query, [id], (err, row) => {
                err ? reject(err) : resolve(row)
            })
        })
    },
    voteGetIps: async ({ id }) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT ips FROM polls WHERE ID = ?'

            db.get(query, [id], (err, row) => {
                err ? reject(err) : resolve(row)
            })
        })
    },
    submitVote: ({ id, ips, votes }) => {
        const query = 'UPDATE polls SET votes = ?, ips = ? WHERE id = ?'

        db.run(query, [votes, ips, id], err => {
            if (err) {
                console.log(err)
            }
        })
    }
}

module.exports = voteModel