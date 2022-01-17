function qs(element) { 
    return document.querySelector(element) 
  } 
  
  let iconError = '<i class="fas fa-times-circle"></i>'
  let validationsErrors = false
  
  window.addEventListener( 'load' , () => {
    let $nombre = qs("#nombre"),
    $nombreErrors = qs("#nombreErrors"),
    $color = qs("#color"),
    $colorErrors = qs("#colorErrors"),
    $talle = qs("#talle"),
    $talleErrors = qs("#talleErrors"),
    $descripcion = qs("#descripcion"),
    $descripcionErrors = qs ("#descripcionErrors"),
    $genero = qs("#genero"),
    $generoErrors = qs("#generoErrors"),
    $coleccion = qs("#coleccion"),
    $coleccionErrors = qs("#coleccionErrors")
    $categoria = qs("#categoria"),
    $categoriaErrors = qs("#categoriaErrors"),
    $precio = qs("#precio"),
    $precioErrors = qs("#precioErrors"),
    $image = qs("#image"),
    $imageErrors = qs('#imageErrors'),
    $form = qs("#form"),
    $submitErrors = qs("#submitErrors"),

     regExImg = /\.(jpg|jpeg|png|webp)$/;
     regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    //regExDNI = /^[0-9]{7,8}$/
    regExNumber = /^[0-9]{3,9}$/
    //regExNumber2 = /^[0-9]{1,9}$/
    //regExNumberrr = /^[0-9,$]*$/
    
    $nombre.addEventListener('blur', function(){
      switch (true) {
        case !$nombre.value.trim():
        $nombreErrors.innerHTML = `${iconError} El Nombre es obligatorio`;
        $nombre.classList.add('is-invalid')
        validationsErrors = true;
        
        break;
        case !regExAlpha.test($nombre.value):
        $nombreErrors.innerHTML = `${iconError} Ingrese un nombre valido`;
        $nombre.classList.add('is-invalid')
        validationsErrors = true;
        break; 
        default:

        $nombre.classList.remove('is-invalid')
        $nombre.classList.add('is-valid')
        $nombreErrors.innerHTML = ''
        validationsErrors = false;
        break;
      }
    })
    
    $color.addEventListener('blur', function(){
      if(!$color.value.trim()){
        $colorErrors.innerHTML = `${iconError} El color es obligatorio`;
        $color.classList.add('is-invalid')
        validationsErrors = true;
      }else {
        $color.classList.remove('is-invalid')
        $color.classList.add('is-valid') 
        $colorErrors.innerHTML = ''
        validationsErrors = false;
      }
    })
    $talle.addEventListener('blur', function(){
      if(!$talle.value.trim()){
        $talleErrors.innerHTML = `${iconError} El talle es obligatoria`;
        $talle.classList.add('is-invalid')
        validationsErrors = true;
      }else {
        
        $talle.classList.remove('is-invalid')
        $talle.classList.add('is-valid')
        $talleErrors.innerHTML = ''
        validationsErrors = false;
      }
    })

    $descripcion.addEventListener('blur', function(){
        switch (true) {
          case !$descripcion.value.trim():
          $descripcionErrors.innerHTML = `${iconError} La descripcion es obligatoria`;
          $descripcion.classList.add('is-invalid')
          validationsErrors = true;
          break;

          case !regExAlpha.test($nombre.value):
          $descripcionErrors.innerHTML = `${iconError} Ingrese descripcion valida`;
          $descripcion.classList.add('is-invalid')
          validationsErrors = true;
          break; 

          default:
        $descripcionErrors.innerHTML = ''
          $descripcion.classList.remove('is-invalid')
          $descripcion.classList.add('is-valid')
          validationsErrors = false;
          break;
        }
      })

      $genero.addEventListener('blur', function(){
        if(!$genero.value.trim()){
          $generoErrors.innerHTML = `${iconError} El genero es obligatorio`;
          $genero.classList.add('is-invalid')
          validationsErrors = true;
        }else {
          
         $genero.classList.remove('is-invalid')
          $genero.classList.add('is-valid')
          $generoErrors.innerHTML = ''
          validationsErrors = false;
        }
      })

      $coleccion.addEventListener('blur', function(){
        if(!$coleccion.value.trim()){
          $coleccionErrors.innerHTML = `${iconError} Coleccion es obligatoria`;
          $coleccion.classList.add('is-invalid')
          validationsErrors = true;
        }else {
          
         $coleccion.classList.remove('is-invalid')
         $coleccion.classList.add('is-valid')
          $coleccionErrors.innerHTML = ''
          validationsErrors = false;
        }
      })

      $categoria.addEventListener('blur', function(){
        if(!$categoria.value.trim()){
          $categoriaErrors.innerHTML = `${iconError} El color es obligatorio`;
          $categoria.classList.add('is-invalid')
          validationsErrors = true;
        }else {
          
          $categoria.classList.remove('is-invalid')
          $categoria.classList.add('is-valid')
          $categoriaErrors.innerHTML = ''
          validationsErrors = false;
        }
      })
    
    $precio.addEventListener('blur', ()=>{
      switch (true) {
        case !$precio.value.trim():
        $precioErrors.innerHTML= `${iconError} El precio es obligatorio`
        $precio.classList.add('is-invalid')
        validationsErrors = true;
        break;
        case !regExNumber.test($precio.value):
        $precioErrors.innerHTML ='ingrese un precio valido';
        $precio.classList.add('is-invalid')
        validationsErrors = true;
        break
        
        default:
        $precioErrors.innerHTML= ""    
        $precio.classList.remove('is-invalid')
        $precio.classList.add('is-valid')
        validationsErrors = false;
        
        break;
      }
    })
    
    
    $image.addEventListener('change', () => {
        if (!regExImg.exec($image.value)) {
            $imageErrors.innerHTML = 'Solo se permiten imagenes con extension JPG, PNG, JPEG, WEBP'
            $image.classList.add('is-invalid')
        }else{
            $imageErrors.innerHTML = ''
            $image.classList.remove('is-invalid')
           $image.classList.add('is-valid')
           validationsErrors = false;
        }
    })

    
})
    
   
 