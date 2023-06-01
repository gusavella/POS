const { body } = require('express-validator')
const path = require('path')
module.exports = [
    body('name')
        .notEmpty().withMessage('Debes escribir un nombre para el producto').bail()
        .isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('code')
        .notEmpty().withMessage('Debes ingresar un codigo').bail()
        .isLength({min:5}).withMessage('El codigo debe tener al menos 5 caracteres'),
    body('description')
        .notEmpty().withMessage('Debes ingresar una descripción').bail()
        .isLength({min:5}).withMessage('La descripción debe tener al menos 5 caracteres'),
    body('value')
        .notEmpty().withMessage('El producto debe tener un precio').bail()
        .isNumeric().withMessage('Debe ser un numero'),
    body('cost')
    .notEmpty().withMessage('El producto debe tener un costo').bail()
    .isNumeric().withMessage('Debe ser un numero'),
    body('category')
        .notEmpty().withMessage('Debe pertenecer a una categoria').bail()
        
    
]