const Transfers = require('../models/transfers.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.sendTransfer = catchAsync(async (req, res, next) => {
  // 1. recibir por la req.body lo que vamos a recibir en la peticion.
  const { amount, senderUserId } = req.body;

  // 2. Recibir por la req las variables enviadas desde las validaciones.
  const {
    receiverUserId,
    amountSenderUser,
    userReceiberTransfer,
    userSenderTransfer,
  } = req;

  // 3. verificar que el monto enviado no sea mayor al monto de la cuenta del usuario.
  if (amount > amountSenderUser) {
    return next(
      new AppError(
        'The amount entered is greater than your current balance.',
        400
      )
    );
  }

  // tambien verificar que el monto enviado no sea menor al monto de la cuenta del usuario.
  if (amountSenderUser < amount) {
    return next(
      new AppError(
        'Please enter a higher amount to continue with the operation.',
        400
      )
    );
  }

  // 4. Verificar  que el ID del que envia no sea igual al ID que recibe.
  if (receiverUserId === senderUserId) {
    return next(new AppError('Cant send money to your same account', 400));
  }

  // 5. crear una  variable para almacenar el nuevo monto del usuario que ENVIA
  const newAmountMakeTransfer = userSenderTransfer.amount - amount;

  // 6.crear una  variable para almacenar el nuevo monto del usuario que RECIBE.
  const newAmountUserReceiver = userReceiberTransfer.amount + amount;

  // 7. ctualizar la informacion del usuario con el nuevo monto q le quedo despues que RECIBIO la transferencia
  await userReceiberTransfer.update({
    amount: newAmountUserReceiver,
  });

  //  8. actualizar la informacion del usuario con el nuevo monto q le quedo despues que ENVIO la transferencia
  await userSenderTransfer.update({
    amount: newAmountMakeTransfer,
  });

  // 9. registrar en nuestra base de datos la tranferencia
  const newTransfer = await Transfers.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  // 10. enviar la respuesta al cliente que diga que la tranferencia se hizo exitosamente
  res.status(200).json({
    status: 'sucess',
    message: 'Successful transfer',
    newTransfer,
  });
});
