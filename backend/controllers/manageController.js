const manageModel = require('../models/manageModel')

const generatePollId = () => {
    const alphabet = [...Array(26).keys()].map(key => String.fromCharCode(key + 97))
    const numbers = [...Array(10).keys()]
    const possibleCharacters = [...alphabet, ...numbers]

    const pollId = [...Array(6)].map(key => {
        return possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)]
    }).join("")

    return pollId
}

const pollWithIdExists = ({id}) => {
    return new Promise((resolve, reject) => {
        manageModel.pollWithIdExists({id})
            .then(exists => resolve(exists))
            .catch(err => reject(err))
    })
}

const manageController = {
    createPoll: async (req, res) => {
        const {question, options, votes, settings} = req.body
        const pollId = generatePollId()

        pollWithIdExists({id: pollId}).then(isIdInvalid => {
            if (!isIdInvalid) {
                manageModel.createPoll({
                    id: pollId,
                    question: question,
                    options: JSON.stringify(options),
                    votes: JSON.stringify(votes),
                    settings: JSON.stringify(settings)
                })

                res.json({
                    id: pollId
                })
            } else {
                manageController.createPoll(req, res)
            }
        })
    }
}

module.exports = manageController