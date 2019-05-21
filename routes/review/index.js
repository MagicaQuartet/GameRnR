const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/', controller.index);
router.get('/list', controller.show);
router.get('/games', controller.game);
router.put('/write', controller.write);
router.put('/delete', controller.delete);

module.exports = router;
