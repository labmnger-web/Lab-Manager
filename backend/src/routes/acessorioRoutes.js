const express = require('express');
const acessorioController = require('../controllers/acessorioController');

const router = express.Router();


router.get('/', acessorioController.getAllAcessorios);
router.post('/', acessorioController.createAcessorio);
router.delete('/:id', acessorioController.deleteAcessorio);
router.put('/:id', acessorioController.updateAcessorio);

module.exports = router;