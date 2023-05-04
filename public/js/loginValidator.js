
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}

else {
    ready()
}

function ready() {

let loginForm = document.getElementById('login-form');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password')
    let errorsBox= document.getElementById('errors')
    errorsBox.style.visibility='hidden'



    loginForm.addEventListener ('submit', function(e){
        let errors = [];
        e.preventDefault();
        // console.log('Entramos en validacion')

    if (email.value ==('')){
        errors.push ('Debes ingresar un usuario');
    } 
    if (password.value == ('')) {
        errors.push ('Debes ingresar una contraseña');
    } else if (password.length < 6) {
        errors.push ('Debes tener al menos 6 caracteres');
    }

    if (errors.length>0 ){
          
        let errorsList= document.getElementById('errors-list')
        errorsList.innerHTML=``
        errorsBox.style.visibility='visible'
        for(let error in errors){   
            errorsList.innerHTML+=`<li class="error">${errors[error]}</li>`  
        }   
      }
   else{
    // console.log('errores:',errors.length)
    // console.log('enviando info')
    loginForm.submit()
   }
})
}



