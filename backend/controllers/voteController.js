const voteModel = require('../models/voteModel')

const voteController = {
    getVotes: async (req, res) => {
        const { id } = req.params

        res.json({
            votes: await voteModel.getVotes(id)
        })
    },
    submitVote: (req, res) => {
        const { id, option } = req.params

        voteModel.submitVote({id, option})
    }
}

module.exports = voteController