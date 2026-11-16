const express = require('express');
const produtoQuimicoController = require('../controllers/produtoQuimicoController');

const router = express.Router();


router.get('/', produtoQuimicoController.getAllProdutosQuimicos);
router.post('/', produtoQuimicoController.createProdutoQuimico);
router.delete('/:id', produtoQuimicoController.deleteProdutoQuimico);
router.put('/:id', produtoQuimicoController.updateProdutoQuimico);

module.exports = router;