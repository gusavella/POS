const express = require('express')
const router = express.Router()
const apiProductsController = require('../controllers/apiProductsController.js')

router.get('/', apiProductsController.all)
router.get('/:id', apiProductsController.detail)
router.post('/search/code', apiProductsController.search)

module.exports = router;