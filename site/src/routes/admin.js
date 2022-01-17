const express = require('express');
const router = express.Router();
const imagenProduct = require('../middlewares/productstorage')


const {list,detail,create,store,edit,update,destroy} = require("../controllers/adminController")



/* GET users listing. */

router.get('/', list)

//Creacion de producto
router.get('/create', create)
router.post('/create', imagenProduct.single('image'),store);

//Detalle de un producto
router.get('/productDetail/:id', detail);

//edicion de producto
router.get('/edit/:id',edit)
router.put('/edit/:id',imagenProduct.single('image'),update)

//borrar un producto
router.delete('/:id',destroy)



module.exports = router;


