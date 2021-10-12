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

const manageController = {
    createPoll: (req, res) => {
        const {question, options, votes, settings} = req.body
        const pollId = generatePollId()

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
    }
}

module.exports = manageController