const bcrypt = require('bcrypt')
const manageModel = require('../models/manageModel')

const alphabet = [...Array(26).keys()].map(key => String.fromCharCode(key + 97))
const numbers = [...Array(10).keys()]
const possibleCharacters = [...alphabet, ...numbers]

const arrayRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)]
} 

const randomString = (length) => {
    const string = [...Array(length)].map(key => {
        return arrayRandomItem(possibleCharacters)
    }).join("")

    return string
}

const pollWithIdExists = ({id}) => {
    return new Promise((resolve, reject) => {
        manageModel.pollWithIdExists({id})
            .then(exists => resolve(exists))
            .catch(err => reject(err))
    })
}

const manageController = {
    pollExists: async (req, res) => {
        const {id} = req.params

        pollWithIdExists({id}).then(exists => {
            res.json({exists})
        })
    },
    createPoll: async (req, res) => {
        const {question, options, votes, settings} = req.body
        const pollId = randomString(6)

        pollWithIdExists({id: pollId}).then(isIdInvalid => {
            if (!isIdInvalid) {
                manageModel.createPoll({
                    id: pollId,
                    question: question,
                    options: JSON.stringify(options),
                    votes: JSON.stringify(votes),
                    settings: JSON.stringify(settings)
                })

                const pollPwd = randomString(12)

                // generate poll's admin password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(pollPwd, salt, (err, hash) => {
                        manageModel.setPwd({
                            id: pollId,
                            pwd: hash
                        })
                    })
                })

                res.json({
                    id: pollId,
                    pwd: pollPwd
                })
            } else {
                manageController.createPoll(req, res)
            }
        })
    },
    deletePoll: async (req, res) => {
        const {id} = req.params
        const {inputPwd} = req.body

        const pollPwdHash = await manageModel.passwordHash({id})

        bcrypt.compare(inputPwd, pollPwdHash, (err, result) => {
            if (result == true) {
                manageModel.deletePoll({
                    id,
                    pwd: inputPwd,
                    hash: pollPwdHash
                })
            }

            res.json({
                success: result
            })
        })
    }
}

module.exports = manageController