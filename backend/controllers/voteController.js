const voteModel = require('../models/voteModel')

const voteController = {
    getVotes: async (req, res) => {
        const { id } = req.params

        res.json({
            response: await voteModel.getVotes({id})
        })
    },
    submitVote: async (req, res) => {
        const { id } = req.params
        const { selectedOptions } = req.body
        const ipAddress = req.socket.remoteAddress
        const ipsThatVoted = await voteModel.voteGetIps({id})

        // get all current votes
        const allVotes = await voteModel.getVotes({id})
        let votes = JSON.parse(allVotes.votes)

        // modify the votes
        selectedOptions.forEach(async (option) => {
            votes[option] += 1
        })

        // allow only one vote per ip
        if (!ipsThatVoted.ips.includes(ipAddress)) {
            voteModel.submitVote({
                id,
                ips: JSON.stringify([...JSON.parse(ipsThatVoted.ips), ipAddress]),
                votes: JSON.stringify(votes)
            })

            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    }
}

module.exports = voteController