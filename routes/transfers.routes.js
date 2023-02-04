const { Router } = require('express');
const { sendTransfer } = require('../controllers/transfers.controller');
const {
  validUserSenderTransfer,
  validUserReceiberTransfer,
} = require('../middleware/validateAmount');

const router = Router();

router.post(
  '/',
  validUserReceiberTransfer,
  validUserSenderTransfer,
  sendTransfer
);

module.exports = {
  transfersRouter: router,
};
