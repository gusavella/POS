const db = require('../database/models')

module.exports = {
    all: async (req, res) => {
        let response = {
            count: 0,
            countByCategory: {},
            products: [], 
        }
        let products = await db.Product.findAll({include: [ "category","mark"]})
        let categories = await db.Category.findAll({include: ["products"]})
        categories.forEach(category => response.countByCategory[category.name] = category.products.length)
        response.count = products.length
        response.products = products.map(product => {
            let productDetail = {
                        id      :   product.id,
                        code    :   product.code,
            short_description   :   product.short_description,
                        price   :   product.price,
                    description :   product.description,
                        image   :   `http://localhost:3030${product.image}`,
                    asociations :   [product.category.name, product.mark.name],
                        detail  :   `/api/products/${product.id}`,
            }
            return productDetail
        })
        return res.json(response)
    },
    detail: async (req, res) => {
        let response = {}
        let product = await db.Product.findByPk(req.params.id, {include: [ "category", "mark"]})
        if(product){
         response = {
            id: product.id,
            name: product.name, 
            description: product.description,
            image: `http://localhost:3030${product.image}`,
            value: product.value,
            discount: product.discount,
            final_value: product.final_value,
            asociations: [product.category, product.section, product.consoles],
            create_time: product.create_time,
            update_time: product.update_time,
            delete_time: product.delete_time
        }
    }
        return res.json(response)
    }

    ,

    search: async (req, res) => {
        let response = {}
       console.warn('body en busqueda:',req.body)
        let product = await db.Product.findOne({where:{
                                                        code:req.body.code
                                                        }
                                                }, 
                                                {include: [ "category", "mark"]}
                                                )
                              
                                         
          if(product)  {      
            let categories = await db.Category.findAll()
            let marks = await db.Mark.findAll()    
            const category= categories.find(category=>category.id==product.id_category) 
            const mark= marks.find(mark=>mark.id==product.id_mark)    
            console.warn('marca:',mark.name  , 'categoria:',category.name ,'color:red')                                   
                        response = {
                            id      :   product.id,
                            code    :   product.code,
                short_description   :   product.short_description,
                            price   :   product.price,
                        description :   product.description,
                            image   :   `http://localhost:3030${product.image}`,
                        asociations :   [category.name, mark.name],
                            detail  :   `/api/products/${product.id}`,
                                    }
    }  
        return res.json(response)
    }
}