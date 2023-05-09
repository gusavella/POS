/* Validación Roles */
const d = document;

/* ROLES */

const nombre = d.getElementById("new-input-role");
const form = d.getElementById("role-form");
const parrafo = d.getElementById("warning");
const roles = d.querySelectorAll(".role-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errors = [];

  if(nombre.value == '' || nombre.value == undefined || nombre.value == null){
    errors.push('error')
  } else {
    for( let i = 0 ; i < roles.length ; i++){
        if(nombre.value.trim().toLowerCase() == roles[i].value.toString().trim().toLowerCase()){
            errors.push('error')
        }
    }
  }
  if(errors.length > 0){
    parrafo.innerText = 'Debe ingresar un nombre válido y no repetido.';
  } else {
    parrafo.innerText = 'Enviado';
    form.submit();
  }

});

const hasNumber = (str) => str.toString().search(/[\d]/) >= 0;
