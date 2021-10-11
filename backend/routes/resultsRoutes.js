const express = require('express')
const router = express.Router()
const resultsModel = require('../models/resultsModel')

router.get('/all', async (req, res) => {
    res.json({
        results: await resultsModel.getAllResults
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    res.json({
        results: await resultsModel.getResults({id: id})
    })
})

module.exports = router