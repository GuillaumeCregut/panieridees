const router = require('express').Router();
const ideaController = require('../controllers/ideasController');

router.get('/', ideaController.findAll);

router.get('/:id',ideaController.findOne);

router.get('/bytheme/:id',ideaController.findOneByTheme);

router.post('/', ideaController.addIdea);

router.put('/:id', ideaController.updateOne);

router.delete('/:id',ideaController.deleteOne);

module.exports = router;