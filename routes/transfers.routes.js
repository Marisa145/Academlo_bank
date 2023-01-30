const { Router } = require('express');
const { amountTransfers } = require('../controllers/transfers.controller');

const router = Router();

router.post('/', amountTransfers);

module.exports = {
  transfersRouter: router,
};
