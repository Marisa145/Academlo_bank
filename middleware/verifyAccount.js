const Users = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validateAccount = catchAsync(async (req, res, next) => {
  //1.obtener de la req.body el accountNumber y password
  const { accountNumber, password } = req.body;
  console.log(accountNumber);
  //2.buscar el usuario que va a recibir el monto donde el status sea true donde el account number = accountnumber que recibo de la req
  const userReceiver = await Users.findOne({
    where: {
      accountNumber: accountNumber,
      password: password,
      status: true,
    },
  });

  if (!userReceiver) {
    //si el usuario no existe enviamos un error
    return next(new AppError('the user is not registered', 400));
  }
  next();
});
