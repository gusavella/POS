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
                id: product.id,
                code:product.code,
                short_description: product.short_description,
                price:product.price,
                description: product.description,
                image: `http://localhost:3030${product.image}`,
                asociations: [product.category.name, product.mark.name],
                detail: `/api/products/${product.id}`,
            }
            return productDetail
        })
        return res.json(response)
    },
    detail: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id, {include: ["section", "category", "consoles"]})
        let response = {
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
        return res.json(response)
    }
}