const router = require('express').Router();
const ideaController = require('../controllers/ideasController');

router.get('/', ideaController.findAll);

router.get('/notprocessed',ideaController.findAllInCart);

router.get('/done',ideaController.findAllDone);

router.get('/:id',ideaController.findOne);

router.get('/bytheme/:id',ideaController.findByTheme);

router.post('/', ideaController.addIdea);

router.put('/:id', ideaController.updateOne);

router.delete('/processed',ideaController.deleteProcessed);

router.delete('/:id',ideaController.deleteOne);

module.exports = router;