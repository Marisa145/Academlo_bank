const Users = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  //1.Obtener el name de la req.body
  const { name } = req.body;
  //2.

  const user = await Users.findOne({
    where: {
      name: name.toLowerCase(),
    },
  });

  if (user) {
    //si el usuario ya existe nos genera un nuevo error q nos indica que el usuario ya existe
    return next(new AppError('The user already exists', 400));
  }
  next();
});
