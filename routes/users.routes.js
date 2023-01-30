const { Router } = require('express');
const {
  historyUser,
  signupUser,
  loginUser,
} = require('../controllers/users.controller');

const router = Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/:id/history', historyUser);

module.exports = {
  usersRouter: router,
};
