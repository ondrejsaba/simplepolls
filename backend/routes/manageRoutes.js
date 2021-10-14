const express = require('express')
const router = express.Router()
const manageController = require('../controllers/manageController')

router.get('/exists/:id', manageController.pollExists)
router.post('/create', manageController.createPoll)

module.exports = router