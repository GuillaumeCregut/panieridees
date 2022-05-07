const router = require('express').Router();
const themesController = require('../controllers/themes.Controller');

router.get('/', themesController.findAll);

router.get('/:id', themesController.findOne);

router.post('/', themesController.addTheme);

router.put('/:id', themesController.updateOne);

router.delete('/:id', themesController.deleteOne);

module.exports = router;