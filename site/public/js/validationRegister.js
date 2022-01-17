//const formularios = document.getElementById('formularios');
//const inputs = document.querySelectorAll('#formularios input')
function qs(element) {
    return document.querySelector(element)
}

let $form = qs('#form');
let $Nombre = qs('#Nombre');
let $NombreError = qs('#erroresNombre')
let $Apellido = qs('#Apellido')
let $ApellidoError = qs('#erroresApellido')
let $DNI = qs('#DNI')
let $DNIError = qs('#erroresDNI')
let $Nacimiento = qs('#Nacimiento')
let $NacimientoError = qs('#erroresNacimiento')
let $Rol = qs('#Rol')
let $RolError = qs('#erroresRol')
let $Sexo = qs('#Sexo')
let $SexoError = qs('#erroresSexo')
let $Email = qs('#Email')
let $EmailError = qs('#erroresEmail')
let $Password = qs('#Password')
let $PasswordError =qs('#erroresPassword')
regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
regExPass = /^(?=.*\d)(?=.*[a-z]).{8,12}$/;
let iconError = '<i class="fas fa-times-circle"></i>'

let validationsErrors = false



window.addEventListener('load',()=>{

$Nombre.addEventListener('blur',function() {
    switch (true) {
        case $Nombre.value.trim().length <= 2 :
            $NombreError.innerHTML = `${iconError}El nombre debe ser mayor a 2 caracteres `
            validationsErrors = true
            break;
        case !regExAlpha.test($Nombre.value) :
            validationsErrors = true
              break;
        default:
            $NombreError.innerHTML= ""
            
            $Nombre.style.border = "3px solid green"
            validationsErrors = false
            break;
    } 
})
$Apellido.addEventListener('change',function(){
    switch (true) {
        
        case $Apellido.value.trim().length <= 2 :
            $ApellidoError.innerHTML = `${iconError} El apellido debe ser mayor a 2 caracteres `
            validationsErrors = true
            break;
        case !regExAlpha.test($Apellido.value) :
              $ApellidoError.innerHTML = "Debes ingresar un apellido valido"
              validationsErrors = true
              break;
        default:
          $ApellidoError.innerHTML= ""
          $Apellido.style.border = "3px solid green"
          validationsErrors = false
            break;
    } 
}) 
$DNI.addEventListener('change',function(){
    switch (true) {
        case $DNI.value.trim().length <= 7 :
            $DNIError.innerHTML = `${iconError} DNI invalido `
            
            validationsErrors = true
            break;

        default:
          $DNI.value.trim()
          $DNIError.innerHTML= ""
          $DNI.style.border = "3px solid green"
          validationsErrors = false
            break;
    } 

})

$Nacimiento.addEventListener('blur', function(){
    switch (true) {
        case !$Nacimiento.value.trim():
            erroresNacimiento.innerHTML =`${iconError} fecha de nacimiento es obligatoria `
            
            validationsErrors = true
            break;
            
            default:
                erroresNacimiento.innerHTML= ""
                
                $Nacimiento.style.border = "3px solid green"
                validationsErrors = false
                
      }
  })


    $Email.addEventListener('blur', function(){
        switch (true) {
            case !$Email.value.trim():
                erroresEmail.innerHTML =`${iconError} El email es obligatorio `
               
                validationsErrors = true
                break;
                case !regExEmail.test($Email.value):
                    erroresEmail.innerHTML = `${iconError} Debe ingresar un email valido `
                    validationsErrors = true
                    break;
                default:
                    erroresEmail.innerHTML= ""
                    $Email.classList.remove('class')
                    $Email.style.border = "3px solid green"
                    validationsErrors = false
                    
                    
                 
          }
      })
      $Password.addEventListener('blur', ()=>{
        switch (true) {
            case !$Password.value.trim():
              $PasswordError.innerHTML= `${iconError} Contraseña es obligatoria ` 
             
              validationsErrors = true
                break;
                case !regExPass.test($Password.value):
                   $PasswordError.innerHTML = `${iconError} La contraseña debe tener: entre 8 o 12 caracteres, al menos una mayúscula, una minúscula y un número ` 
               validationsErrors = true
              break
        
            default:
             $PasswordError.innerHTML= ""    
              
              $Password.style.border = "3px solid green"
              validationsErrors = false
              break;
        }
    })

   /* $Rol.addEventListener('blur', function(){
        switch (true) {
            case !$Rol.value.trim():
                erroresRol.innerHTML =`${iconError} Seleccione un rol `
               
                validationsErrors = true
                break;
                
                default:
                    $SexoError.innerHTML= ""
                   
                    $Rol.style.border = "3px solid green"
                    validationsErrors = false
                    
          }
      })*/
    
      $Sexo.addEventListener('blur', function(){
        switch (true) {
            case !$Sexo.value.trim():
                erroresSexo.innerHTML =`${iconError} selecciona un genero `
                
                validationsErrors = true
                break;
                
                default:
                    erroresSexo.innerHTML= ""
                    
                    $Sexo.style.border = "3px solid green"
                    validationsErrors = false
                    
          }
      })
      $Sexo.addEventListener('blur', function(){
        if(!$Sexo.value.trim()){
          $erroresSexo.innerHTML = `${iconError} El color es obligatorio`;
          
          validationsErrors = true;
        }else {
          
          $colorErrors.innerHTML = ''
          $Sexo.style.border = "3px solid green"
          validationsErrors = false;
        }
      })
})


    