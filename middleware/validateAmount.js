const Users = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUserReceiberTransfer = catchAsync(async (req, res, next) => {
  // 1. Recibir la cuenta random del usuario de la req.body
  const { accountNumber } = req.body;

  // 2. buscar al usuario que va a RECIBIR la transferencia y que el status sea true

  const userReceiberTransfer = await Users.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });

  //  3. verificamos que el usuario exista sino enviamos un error
  if (!userReceiberTransfer) {
    return next(new AppError('User not found', 404));
  }

  // 4. agregar una nueva propiedad a la  req con el  ID del usuario q va a  RECIBIR la trasferencia
  req.receiverUserId = userReceiberTransfer.id;
  //  5. agregar otra propeidad a la req  donde obtenemos el usuaio que va a recibir
  req.userReceiberTransfer = userReceiberTransfer;

  next();
});

exports.validUserSenderTransfer = catchAsync(async (req, res, next) => {
  //1. recibir senderUserId que viene de las reques que nos da la req.body
  const { senderUserId } = req.body;

  //2. buscar al usuario q va a ENVIAR la trasferencia, el ID debe ser igual al que recibimos de las req.body
  const userSenderTransfer = await Users.findOne({
    where: {
      id: senderUserId,
      status: true,
    },
  });

  // 3.verificar q el usuario exista y sino enviamos un error
  if (!userSenderTransfer) {
    return next(new AppError('User not found', 404));
  }

  // 4. agregar a la req el monto que tiene el usuario a enviar
  req.amountSenderUser = userSenderTransfer.amount;
  // 5. agrgar otra propiedad a la req donde obtenemos al ususario q va a ENVIAR.
  req.userSenderTransfer = userSenderTransfer;

  next();
});
