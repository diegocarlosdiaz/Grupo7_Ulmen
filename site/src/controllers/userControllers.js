let db = require("../database/models")
const { validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")




module.exports = {
    register: (req, res) => {
        let roles = db.Rol.findAll()
        let generos = db.Genero.findAll()

        Promise.all([roles,generos])

            .then(([roles,generos]) => {
                return res.render('register',{
                    roles,
                    generos
                })
            })
            .catch(error => console.log(error))
    },
    login: (req, res) => {
     
            return res.render('login')
    },
    profile: (req, res) => {
        db.Usuarios.findByPk(req.session.usuarioLogin.id)
            .then(usuario => {
                return res.render("profile", {
                    usuario
                })
            }).catch(err => {
                res.render("errors")
            })
    },
    agregarUser: (req, res) => {
        const errors = validationResult(req)
        let { Nombre, Apellido, Email, Password, DNI, Nacimiento, Sexo} = req.body
        if (errors.isEmpty()) {
            db.Usuarios.create({
                nombre: Nombre.trim(),
                apellido: Apellido.trim(),
                email: Email.trim(),
                contraseña: bcrypt.hashSync(Password, 12),
                DNI: DNI.trim(),
                nacimiento: Nacimiento.trim(),
                id_genero: Sexo.trim(),
                id_rol: 2


            }).then(usuario => {
                req.session.usuarioLogin = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    rol : usuario.id_rol
                }
                return res.redirect("/login")
            }).catch(error => console.log(error))


        } else {

            let roles = db.Rol.findAll()
            let generos = db.Genero.findAll()
    
            Promise.all([roles,generos])
    
                .then(([roles,generos]) => {
                    return res.render('register',{
                        roles,
                        generos,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(error => console.log(error))

        }
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        
        const { email } = req.body
        if (errors.isEmpty()) {
            db.Usuarios.findOne({
                where: {
                    email
                }
            }).then(usuario => {
                
                req.session.usuarioLogin = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    rol : usuario.id_rol

                }

                    /* carrito */
                req.session.cart = [];

                db.Orden.findOne({
                    where: {
                        id_usuario: req.session.usuarioLogin.id,
                        estado: 'pendiente'
                    },
                    include: [
                        {
                            association: 'carritos',
                            include: [
                                {
                                    association: 'producto',
                                    include: [{ all: true }]
                                }
                            ]
                        }
                    ],
                })

                .then(orden => {
                    if (orden) {
                        console.log(orden)
                        orden.carritos.forEach(item => {
                            let producto = {
                                id: item.id_producto,
                                nombre: item.producto.nombre,
                                imagen: item.producto.imagenes[0].nombre,
                                precio: item.producto.precio,
                                cantidad: item.cantidad,
                                talle: item.producto.talles.nombre,
                                total: item.producto.precio * item.cantidad,
                                id_orden: orden.id
                            }
                            req.session.cart.push(producto)
                        })
                    }
                    return res.redirect('/')

                })
                .catch(error => console.log(error))
                


            }).catch(error => console.log(error))
        } else {
            
            return res.render("login", {
                errors:errors.mapped()
            })
        }

    },
    
    update: (req, res) => {
        const {Nombre,contraseña} = req.body
        db.Usuarios.update(
            {
                nombre: Nombre.trim(),
                
            },
            {
                where: {
                    id: req.session.usuarioLogin.id
                }
            }
        ).then(() => {
            if (contraseña) {
                console.log("contraseña=>", contraseña)
                db.Usuarios.update(
                    {
                        contraseña: bcrypt.hashSync(contraseña.trim(), 12)
                    },
                    {
                        where: {
                            id: req.session.usuarioLogin.id
                        }
                    }

                ).then(() => {
                    req.session.destroy()
                    return res.redirect('/login')
                })
            } else {
                db.Usuarios.findByPk(req.session.usuarioLogin.id)
                    .then(usuario => {
                        req.session.usuarioLogin = {
                            id: usuario.id,
                            nombre: usuario.nombre,
                        }
                        res.locals.usuarioLogin = req.session.usuarioLogin

                        return res.redirect("/profile")
                    })
            }
        }).catch(error => console.log(error))
    },
    cerrarSesion: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },


}