
//const {Producto, Categoria} = require('../../database/models');
const {body, check} = require ('express-validator');

module.exports = {
       create: [
        check('nombre')
            .notEmpty()
            .withMessage('Agregar nombre del producto.')
            .bail()
            .isLength({min:3, max:100})
            .withMessage('El nombre debe tener mas de dos letras.'),
        
        check('color')
            .notEmpty()
            .withMessage('Agregar color.')
            .bail(),
        
        check('precio')
            .notEmpty()
            .withMessage("Coloca un precio")
            .isNumeric()
            .withMessage("Solo puedes ingresar números"),
]}


