const {check,body} = require('express-validator')
const db = require("../database/models")

module.exports = [
    check('Nombre')
    .notEmpty()
    .withMessage('Debes ingresar tu nombre.')
    .bail()
    .custom(value => {
        let spacebar = value.replace(/\s+/g, '');
        let trim = /^[a-zA-Z\s]+$/.test(spacebar);
                return trim;
    })

    .withMessage('El nombre debe contener letras unicamente.'),
       
    check('Apellido')
     .notEmpty()
     .withMessage("Debes imgresar tu Apellido.")
     .bail()
     .isLength({min:3, max:20})
     .withMessage('El apellido debe tener mas de dos letras.')
     .bail()
     .custom(value => {
            let spacebar = value.replace(/\s+/g, '');
            let trim = /^[a-zA-Z\s]+$/.test(spacebar);
            return trim;
            })
            .withMessage('El apellido debe contener letras unicamente'),

    check('DNI').notEmpty().withMessage("Se requiere el campo DNI").bail()
    .isLength({min: 8, max: 100}).withMessage('El campo Dni debe tener al menos 8 caracteres'),

    check('Nacimiento')
    .notEmpty()
    .withMessage("Debes ingresar una Fecha de nacimiento")
     .bail()
     .custom (value => {
        let input = new Date(value);
        let actualDate = new Date ();
        let dayInput = (input.getDate()+1);
        let monthInput = (input.getMonth()+1);
        let yearInput = input.getFullYear(input);
        let dayActualDate = actualDate.getDate();
        let monthActualDate = (actualDate.getMonth(actualDate)+1);
        let yearActualDate = actualDate.getFullYear(actualDate);
        let result
        if ((yearActualDate - yearInput) <= 18) {
            result = yearActualDate - yearInput;
            if (monthActualDate <= monthInput) {
                if (dayActualDate < dayInput) {
                    result = (yearActualDate - yearInput) -1
                    return (result >= 18);
                } else {
                    return (result >= 18);
                }
            }
            else {
                return (yearActualDate - yearInput>= 18);
            }
        } else {
            return (yearActualDate - yearInput >= 18);
        } 
    })
    .withMessage('Debes ser mayor de 18 años para registrarte.'),

    check('Sexo')
    .notEmpty()
    .withMessage("seleccione el Sexo"),

    check('Email')
    .notEmpty()
    .withMessage("Se requiere el Email")
    .isEmail(),

    body("Email")
    .custom (value => {
        console.log(value)
        return db.Usuarios.findOne({
            where:{
                email:value
            }
        }) .then(usuario => {
            if(usuario){
                return Promise.reject("Email ya registrado")
            }
        })
    }),

    check('Password')
    .notEmpty()
    .withMessage("Debes ingresar una contraseña.")
    .bail()
    .isLength({min:8, max:12})
    .withMessage('La contraseña debe tener entre 8 y 12 caracteres.')
    .bail()
    .isAlphanumeric()
    .withMessage('La contraseña debe contener letras y números.')
    .bail(),
]
