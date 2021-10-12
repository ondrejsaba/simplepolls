const resultsModel = require('../models/resultsModel')

const resultsController = {
    getAllResults: async (req, res) => {
        res.json({
            results: await resultsModel.getAllResults
        })
    },
    getResults: async (req, res) => {
        const { id } = req.params

        res.json({
            results: await resultsModel.getResults({id})
        })
    }
}

module.exports = resultsController