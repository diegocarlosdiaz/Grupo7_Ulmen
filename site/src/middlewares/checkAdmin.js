module.exports = (req,res,next) => {
    if(req.session.usuarioLogin?.rol == 1){
        next()
   }else{
    res.redirect('/')

   }
   
}