const {body} = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require ("../database/models")

module.exports = [
    
    body("email")
    .custom((value,{req}) => {
        
        
        return db.Usuarios.findOne({
            where:{
                email:value
            }
        }) .then (usuario => {
            console.log(usuario);
            if(!usuario || !bcrypt.compareSync(req.body.password, usuario.contraseña)){
                return Promise.reject("credenciales invalidas")
            }
        })
    }) 

]