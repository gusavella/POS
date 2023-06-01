if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}

else {
    ready()
}


function ready() {
let form = document.getElementById('form')
let name=document.getElementById('name')
let description=document.getElementById('description')
let category=document.getElementById('category')
let price = document.getElementById('value')
let cost = document.getElementById('cost')
let code = document.getElementById('code')
let mark= document.getElementById('mark')
let errorsBox= document.getElementById('errors')
errorsBox.style.visibility='hidden'


 form.addEventListener('submit',async (e)=>{
    const URLactual = window.location.href
    const isEditing =URLactual.includes('edit')
    console.log('Esta editando:',isEditing)
    let errors =[];
    e.preventDefault()

    const response = await fetch('/api/products/')
    const {info,products} = await response.json()
    if (isEditing==false){
        if (name.value==""){
            errors.push('Debes ingresar un nombre')
            }
        else if (name.value.length>1 && name.value.length < 3 ){
            errors.push('Nombre debe ser mayor o igual a 3 caracteres')
            }  

        if (code.value ==""|| code.value ==undefined ||code.value ==null){
            errors.push('Debes ingresar un codigo no nulo')
            }
        for ( let product of products){
            if (code.value ==product.code){
                errors.push('Debes ingresar un codigo no repetido')
                } 
            if(name.value==product.short_description){
                errors.push('Debes ingresar nombre de producto no repetido')
            }
        }
        }
   

    if (description.value.length<=0 && isDiferentId){
        errors.push('Debes ingresar una descripcion del producto')
        }
    else if (description.value.length>1 && description.value.length < 3 ){
        errors.push('Descripcion debe ser mayor o igual a 3 caracteres')
        }
    if (category.value.length<=0 && isDiferentId){
        errors.push('Debes ingresar una categoria')
        }
    if (cost.value<0 ||cost.value==""){
        errors.push('Debes ingresar un costo de producto')
        }
    if (price.value<=0 ||price.value==""){
        errors.push('Debes ingresar un valor de producto mayor a cero')
       }
    if (mark.value<=0){
    errors.push('Debes ingresar un valor de marca mayor a cero')
        }
    if (code.value ==""|| code.value ==undefined ||code.value ==null){
    errors.push('Debes ingresar un codigo no nulo')
    }
        
    for ( let product of products){
      //valida que este editando el mismo registro
        const isDiferentId=product.id != URLactual.toString().split("/").slice(-2)[0]
        
        if (code.value ==product.code && isDiferentId){
            errors.push('Debes ingresar un codigo no repetido')
            } 
        if(name.value==product.short_description && isDiferentId){
            errors.push('Debes ingresar nombre de producto no repetido')
        }
    }

  console.log('errores:',errors.length)
    if (errors.length>0 ){
          
        let errorsList= document.getElementById('errors-list')
        errorsList.innerHTML=``
        errorsBox.style.visibility='visible'
        for(let error in errors){   
            errorsList.innerHTML+=`<li class="error">${errors[error]}</li>`  
        }   

         Swal.fire(
            'Cuidado!',
            'Verifica los errores',
            'error'
        )
      }
   else{
    // console.log('errores:',errors.length)
    // console.log('enviando info')
    form.submit()
   }

})



}