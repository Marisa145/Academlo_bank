const { Router } = require('express');
const { signupUser, loginUser } = require('../controllers/users.controller');
const { validateAccount } = require('../middleware/verifyAccount');

const router = Router();

router.post('/signup', signupUser);

router.post('/login', validateAccount, loginUser);

module.exports = {
  usersRouter: router,
};
