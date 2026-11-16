const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/', authMiddleware, usuarioController.getAllUsers);
//router.post('/login', usuarioController.login);
router.post('/', usuarioController.createUser);
//router.delete('/:id', authMiddleware, usuarioController.deleteUser);
//router.put('/:id', authMiddleware, usuarioController.updateUser);

module.exports = router;
