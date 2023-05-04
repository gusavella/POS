const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('email')
	.notEmpty().withMessage('Tienes que escribir un usuario').bail()
	,
	body('password')
	.notEmpty().withMessage('Tienes que escribir una contraseña')
]