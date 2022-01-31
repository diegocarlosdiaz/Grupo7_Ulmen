const router = require('express').Router()
const path = require('path')
const {home, nosotros,search} = require('../controllers/mainControllers')


router.get('/', home),
router.get('/nosotros', nosotros)
router.get('/search', search)
module.exports = router