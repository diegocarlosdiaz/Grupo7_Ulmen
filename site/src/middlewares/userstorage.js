const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images/usuarios')
    },
    filename: function (req, file, cb){
        cb(null,'img-'+ Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = function (req,file,cb){
    if (!file.originalname.match(/.(jpg|jpeg|png|webp)$/)) {
req.fileValidationError= "Solo se permiten Imagenes"
  return cb(null,false,req.fileValidationError)
}
    cb(null,true)
}
const upload = multer ({
    storage
})
module.exports = upload	