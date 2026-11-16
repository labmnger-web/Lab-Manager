const express = require('express');
const equipamentoController = require('../controllers/equipamentoController');

const router = express.Router();


router.get('/', equipamentoController.getAllEquipamentos);
router.post('/', equipamentoController.createEquipamento);
router.delete('/:id', equipamentoController.deleteEquipamento);
router.put('/:id', equipamentoController.updateEquipamento);

module.exports = router;