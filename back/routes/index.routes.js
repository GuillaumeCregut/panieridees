const router = require('express').Router();
const themes= require('./themes.routes');

router.use('/themes',themes);
module.exports = router;