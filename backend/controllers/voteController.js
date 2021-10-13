const voteModel = require('../models/voteModel')

const voteController = {
    getVotes: async (req, res) => {
        const { id } = req.params

        res.json({
            response: await voteModel.getVotes({id})
        })
    },
    submitVote: async (req, res) => {
        const { id, option } = req.params
        const ipAddress = req.socket.remoteAddress
        const ipsThatVoted = await voteModel.voteGetIps({id})

        // allow only one vote per ip
        if (!ipsThatVoted.ips.includes(ipAddress)) {
            // get all votes and the voted item by its index, then add the vote and submit
            const optionVotes = await voteModel.getVotes({id})
            let votes = JSON.parse(optionVotes.votes)
            const voteFor = Array.from(Object.keys(votes))[option]

            votes[voteFor] += 1
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