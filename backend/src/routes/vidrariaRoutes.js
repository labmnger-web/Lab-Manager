const express = require('express');
const vidrariaController = require('../controllers/vidrariaController');

const router = express.Router();


router.get('/', vidrariaController.getAllVidrarias);
router.post('/', vidrariaController.createVidraria);
router.delete('/:id', vidrariaController.deleteVidraria);
router.put('/:id', vidrariaController.updateVidraria);

module.exports = router;
