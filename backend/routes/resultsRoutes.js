const express = require('express')
const router = express.Router()
const resultsController = require('../controllers/resultsController')

router.get('/all', resultsController.getAllResults)
router.get('/:id', resultsController.getResults)

module.exports = router