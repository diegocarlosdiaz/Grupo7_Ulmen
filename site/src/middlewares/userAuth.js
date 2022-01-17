module.exports = (req, res, next) => {
    if (!req.session.usuarioLogin) {
        return res.redirect('/login')
    } 
    next()
}