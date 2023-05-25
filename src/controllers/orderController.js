const db = require('../database/models');
const fs = require('fs');
// const PDFDocument = require('pdfkit-table');
const PDFDocument = require('pdfkit');
const PDFTable = require('pdfkit-table');
const sequelize = db.sequelize;
const controller = {
    all: async (req, res) => {
        try{
            let orders=await db.Order.findAll({include:["user","order_product"]})
            res.json(orders)
        }catch(e){
            console.log(e)
        }
    },
    create:async(req,res)=>{
        try{
            // console.log('productos:',req.body.products )
           let createdOrder=await db.Order.create({
                                 total  :   req.body.total,
                                id_user :   req.session.userLogged.id    // para grabar el id del usuario que esta en la sesion (logueado)         
                                })
             console.log('orden creada:',createdOrder)    
            let products=    req.body.products            
            for(let product in products){
                    await db.OrderProduct.create({
                        quantity : products[product].quantity,
                           value : products[product].price,
                        subTotal : products[product].subTotal,
                        id_order : createdOrder.id,
                      id_product : products[product].id

                    })
            }                       
           res.json({
                information:{
                    status:200,
                }                      
           })
        }catch(e){
            console.log(e)
        //    console.log('Nombre:',e.name)  
        //    console.log('errors:',e.errors) 
         //  console.log('errors length:',e.errors.length)  
           for(error in e.errors){
            console.log('error:',e.errors[error].validatorKey)  
           }
           res.redirect('/orders/all')//,errors:e.errors
        }
       
      },
      update:async(req,res)=>{
        try{
            // console.log('paramsId:',req.params.id)
            // console.log(req.body)
            await db.Order.update({name:req.body.name},
                {where:{
                        id:req.params.id
                        }
                })
            res.redirect('/orders/all')
        }catch(e){
            console.log(e)
        }
      },
      delete:async(req,res)=>{
        try{
           await db.Order.destroy({where:{
            id:req.params.id
           }})
            res.redirect('/orders/all')
        }catch(e){
            console.log(e)
        }
      },
      searchByUser: async (req,res)=>{
        try{
            let orders=await db.Order.findAll({include:["order_product"]})
            let products=await db.Product.findAll()
            let filteredOrders=orders.filter(order=>order.id_user==req.params.id)

             //  res.json(filteredOrders)
            res.render('orders/byUser.ejs',{tittle:'Ordenes del usuario',orders:filteredOrders,products,userId:req.params.id})
         }catch(e){
             console.log(e)
         }
      },
      printOrder: async (req,res)=>{
try{
        let allOrders=await db.Order.findAll({include:["order_product"]})
            let products=await db.Product.findAll()
            let orders=allOrders.filter(order=>order.id_user==req.params.id)
            let rows=[]
            let totalInOrders=0
             if(orders){
              for (let order in orders){ 
                
                let productsinOrder=""
                for( let orderProduct in orders[order].order_product){
                  let productOfOrder=products.find((prod) =>orders[order].order_product[orderProduct].id_product==prod.id)
                  productsinOrder+=`${productOfOrder  ? productOfOrder.short_description :'producto'} ${orders[order].order_product[orderProduct].value} X ${orders[order].order_product[orderProduct].quantity}=${orders[order].order_product[orderProduct].subTotal}\n`
                }
                
                rows.push (  [
                  `${orders[order].id}`,
                  `${orders[order].create_time.toString().substring(0, 25)}`,
                  `$ ${orders[order].total}`,
                  `${productsinOrder}`,
                 
                ])
                totalInOrders+=parseInt(orders[order].total)
               
                }
              rows.push(["","TOTAL",`$${totalInOrders}`])
           }else if(!orders){
            rows= [
              "No hay datos para mostrar",
            ]
           }
           

           const table = {
            title: "Teca papeleria",
            subtitle: "Informe de ordenes",
            headers: [ "Id", "Fecha","Valor","Productos" ],
            rows}

     
        // init document
          let doc = new PDFTable({ margin: 30, size: 'Letter' });
          // save document
          doc.pipe(fs.createWriteStream("./public/tabla.pdf"));


            // the magic
            let createdPDF=await doc.table(table);
            // done!
            // console.log(createdPDF)
            doc.end();fs.rmSync
        // // Leer el archivo PDF generado
        const file = fs.readFileSync('./public/tabla.pdf');

        if(file){
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=tabla.pdf');
        res.send(file);
        }
      

    } 
      catch(e){

        console.log(e)
      }
    }
     

}

    module.exports=controller;