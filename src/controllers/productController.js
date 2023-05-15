const fs = require("fs");
const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const {validationResult} = require('express-validator');


const controller = {
  index: async(req, res) => {
    let category = await db.Category.findAll()
    await db.Product.findAll({include: ["category","mark"]})
    .then(products => {
        res.render('products/main.ejs', {category,products:products,tittle:'Teca'});
    })
  },
  byCategory: async(req,res) => {

    if(req.params.id){

   const category=await  db.Category.findByPk(req.params.id)
    db.Product.findAll(
                        {
                          where:{
                                  id_category:req.params.id
                                  }
                        },
                        {include: ["category"]})
    .then(products => {
      res.render('products/byCategory.ejs', {products,tittle:'Teca',category_name:category.name})
    })
  }
  else{
    res.redirect('/')
  }
 
  },
  recommended: (req,res) => {

    db.Product.findAll({include: ["category"]})
    .then(products => {
      res.render('products/recommended.ejs', {products:products,tittle:'Teca'})
    })
 
  },
  offer: (req,res) => {
    db.Product.findAll({include: ["section","category","consoles"]})
    .then(products => {
      res.render('products/offers.ejs', {products:products,tittle:'Games Hub'})
    })
    
  },
  allProducts: (req,res) => {
    db.Product.findAll({include: ["category"]})
    .then(products => {
      res.render('products/product.ejs', {products:products,tittle:'Teca'})
    })
    
  },
  search: (req,res) => {
    res.render('products/productSearch.ejs', {tittle: 'Teca'})
  },
  productDetail: (req, res) => {
    db.Product.findByPk(req.params.id,{include: ["category","mark"]})
    .then(product => {
           res.render("products/productDetail", { tittle: "Product" , product});
    })  
  },
  newProduct: async(req, res) => {
    const categories= await db.Category.findAll();
    const marks= await db.Mark.findAll();
    res.render("products/newProduct", { tittle: "New Product" ,categories,marks});
  },
  create: async(req, res) => {
    const categories= await db.Category.findAll();
    const marks= await db.Mark.findAll();
    const resultValidationProduct = validationResult(req);
      if (resultValidationProduct.errors.length > 0){
        return res.render('products/newProduct', { tittle: 'New Product',
          categories,marks,
          errors: resultValidationProduct.mapped(),
          oldData: req.body
        })
      } 
      else {
          try{
            let createdProduct= await db.Product.create(
                    {
                  short_description : req.body.name ,
                               code : req.body.code,
                        description : req.body.description.trim(),
                              image : req.file ? '/images/games/'+ req.file.filename : '/images/defaultImage.png',
                              price : parseFloat(req.body.value),
                               cost : parseFloat(req.body.cost),
                              stock : req.body.stock ? req.body.stock : 1,
                        id_category : req.body.category,
                            id_mark : req.body.mark,
                            id_state: 1  
                    })
console.log("Producto creado",createdProduct)
                  res.redirect('/products/edit/list')
              
              }
  catch(e){console.log(e)} 
}
  },
  showEdit: async (req, res) => {
    try{
    let categories= await db.Category.findAll();
    let marks= await db.Mark.findAll();
    let product= await  db.Product.findByPk(req.params.id,{include: ["category","mark"]})
  
    res.render("products/editProduct.ejs", { tittle: "Editar Producto" ,product,categories,marks});
    }
    catch(e){
      console.log(e)
    }
  },

  update: async(req, res) => {
    console.log('Entra a actualizar')
    let productOld = await  db.Product.findByPk(req.params.id)
    let categories= await db.Category.findAll();
    let marks= await db.Mark.findAll();
    let product= await  db.Product.findByPk(req.params.id,{include: ["category","mark"]})

    const resultValidationProduct = validationResult(req);
      if (resultValidationProduct.errors.length > 0){
        return res.render('products/editProduct', { tittle: 'Editar Producto',
          categories,marks,product,
          errors: resultValidationProduct.mapped(),
          oldData: req.body
        })
      } else {
        try{
        const editedProduct={   
  short_description : req.body.name,
              price : req.body.value,
               cost : req.body.cost,
        description : req.body.description,
              image : req.file ?'/images/games/'+req.file.filename:productOld.image,
        id_category : req.body.category,
            id_mark : req.body.mark,
              stock : req.body.stock ?   req.body.stock : productOld.stock
}

 await db.Product.update(editedProduct, {
   where:{
     id:req.params.id
   }
 });
 res.redirect('/products/edit/list')
}
catch(e){
console.log(e)
}

      }


    
  },
  delete: async (req,res)=>{
   
    try{
       await  db.Product.destroy({where :{
                                          id:req.params.id
                                        }})   
    res.redirect('/products/edit/list')
    }
    catch(e){
      console.log(e)
  }
},
  
  cart: (req, res) => {
    let totalCart=0
    productsCart = [];
    for(const element of productsCart) { 
      totalCart=element.discountValue+totalCart
     }
     totalCart=parseFloat(totalCart).toFixed(2)
    res.render("products/productCart.ejs",{products:productsCart,totalCart:totalCart,tittle:'Product Cart'});

  },
  addToCart:(req,res)=>{
    let product = products.find(product=>product.id==req.params.id)
    if(!product){
      res.redirect(`/`)
    }
    productsCart.push(product)
    fs.writeFileSync(productsCartFilePath,JSON.stringify(productsCart,null," "));
    res.redirect(`/products/cart/all`)
  },
  
  cartDelete:(req,res)=>{
   
      const id = req.params.id;
      const finalProductsCart=productsCart.filter(product=>product.id!=id);
      fs.writeFileSync(productsCartFilePath,JSON.stringify(finalProductsCart,null," "));
      res.redirect(`/products/cart/all`)
  },
  showList:(req,res)=>{
    db.Product.findAll({include: ["category","mark"]})
    .then(products => {
      res.render('products/productList.ejs', {products:products,tittle:'Lista de productos'})
    })
  }
};

module.exports = controller;
