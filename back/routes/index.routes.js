const router = require('express').Router();
const themes= require('./themes.routes');
const ideas=require('./ideas.routes');

router.use('/themes',themes);
router.use('/ideas',ideas);

module.exports = router;