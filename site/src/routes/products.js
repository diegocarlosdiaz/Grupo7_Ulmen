const router = require('express').Router()
const path = require('path')
const {productFilter, productDetail,productCart,list} = require('../controllers/productsControllers')


router.get('/productfilter',productFilter)

router.get('/productDetail/:id', productDetail)

router.get('/productCart', productCart)

router.get('/productos', list)




module.exports = router