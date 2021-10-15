const bcrypt = require('bcrypt')
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
        const query = 'INSERT INTO polls(id, question, options, votes, settings) VALUES (?, ?, ?, ?, ?)'

        db.run(query, [id, question, options, votes, settings], err => {
            if (err) {
                console.log(err)
            }
        })
    },
    setPwd: ({id, pwd}) => {
        const query = 'UPDATE polls SET admin_pwd = ? WHERE id = ?'

        db.run(query, [pwd, id], err => {
            if (err) {
                console.log(err)
            }
        })
    },
    passwordHash: async ({id}) => {
        return new Promise((resolve, reject) => {
            const adminPasswordHashQuery = 'SELECT admin_pwd FROM polls WHERE id = ?'

            db.get(adminPasswordHashQuery, [id], (err, row) => {
                err ? reject(err) : resolve(row.admin_pwd)
            })
        })
    },
    deletePoll: ({id, pwd, hash}) => {
        const deleteQuery = 'DELETE FROM polls WHERE id = ?'

        bcrypt.compare(pwd, hash, (err, result) => {
            if (result == true) {
                db.run(deleteQuery, [id], err => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    }
}

module.exports = manageModel