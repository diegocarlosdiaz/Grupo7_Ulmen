const router = require('express').Router()
const path = require('path')
const {show,add,remove} = require('../controllers/carritoController')


router
    .get('/show', show)
    .post('/add/:id', add)
    .delete('/remove/:id',remove)

module.exports = router