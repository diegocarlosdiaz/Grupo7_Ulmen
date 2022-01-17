const express = require('express');
const router = require('express').Router()
const {login, register, processLogin, profile, cerrarSesion,update,agregarUser} = require('../controllers/userControllers')
const imagenUser = require('../middlewares/userstorage')
const guestUser = require('../middlewares/guestUser')
const userAuth = require('../middlewares/userAuth')
const validateRegister = require('../middlewares/validateRegister')
const validateLogin = require('../middlewares/validateLogin')

//Register
router.get('/register',guestUser, register)
router.post('/register', imagenUser.single('image'), validateRegister,agregarUser)

//editar perfil

router.get('/profile', userAuth, profile)
router.put('/update',imagenUser.single('image'), update )

//Login
router.get('/login',guestUser, login)
router.post('/login',validateLogin, processLogin)


router.get('/cerrarSesion', cerrarSesion)

module.exports = router