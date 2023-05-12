if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}

else {
    ready()
}




function ready(){
    if (JSON.parse(localStorage.getItem("productsInCart")) == null)localStorage.setItem("productsInCart", JSON.stringify([]))
    // cartNumber()
    let formAddProductWithCode= document.getElementById("form-add-product-with-code")
    // console.log(button)


    formAddProductWithCode.addEventListener("submit", async(e) => {
        e.preventDefault()
        console.log('Ingreso a producto por codigo')
        let body={code : formAddProductWithCode.code.value ? formAddProductWithCode.code.value : 0} 
        console.log(body)
        const response = await fetchSearch(body)
        if(response && response.id!=undefined){
            console.log('response de la api',response)
            addItem(response)
            displayEmptyCart()
            displayCart()

        }
       
        })

}

function cartNumber() {
    let numberItems = document.querySelector(".cartNmb")
    let lengthCart = JSON.parse(localStorage.getItem("productsInCart")).length
    if (lengthCart != 0) numberItems.innerText = `${lengthCart}`
}

function addItem(response){
    let prodsCart = JSON.parse(localStorage.getItem("productsInCart"))
    let product = {
        id: response.id,
        name: response.short_description,
        price: response.price,
        image: response.image
    }

    //  console.log('Producto Agregado:',product)
    if (prodsCart.length > 0) {
        let productInCart = prodsCart.find(prod => prod.id == product.id)
        if (!productInCart) {
            // console.log('entrando por !productInCart es decir producto no encontrado')
            product.quantity = 1
            product.subTotal = product.quantity * product.price
            // console.log('producto:', product)
            prodsCart = [...prodsCart, product]
        }
        else {
            // console.log('entrando por productInCart')
            productInCart.quantity += 1
            productInCart.subTotal = productInCart.price * productInCart.quantity 
            // console.log('producto:', productInCart)
        }
    }
    else {
        // console.log('entrando por prodsCart.length= 0')
        product.quantity = 1
        product.subTotal = product.quantity * product.price
        prodsCart.push(product)
    }
    localStorage.setItem("productsInCart", JSON.stringify(prodsCart))
    // cartNumber()
}

async function fetchSearch(model) { 
    const res = await fetch('/api/products/search/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(model)
    })
    let info = await res.json()
    return info
}   