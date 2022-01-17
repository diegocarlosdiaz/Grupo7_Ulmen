const router = require('express').Router()
const path = require('path')
const {home, nosotros} = require('../controllers/mainControllers')


router.get('/', home),
router.get('/nosotros', nosotros)
module.exports = router