const Transfers = require('../models/transfers.model');
const Users = require('../models/users.model');

exports.amountTransfers = async (req, res) => {
  //1.recibir el monto , acconutNumber enviamos el id de quien hace la transferencia = req.body
  const { amount, accountNumber, senderUserId } = req.body;
  //2.userReceiver buscar el usuario que va a recibir el monto donde el status sea true donde el account number = accountnumber
  const userReceiver = await Users.findOne({
    where: {
      status: true,
      accountNumber: accountNumber,
    },
  });
  //3.crear una constante que se llame reciverUserId = userReceiver.id
  const receiverUserId = userReceiver.id;
  //4.buscar al usuario que va a ser la tranferencia
  const userMakeTransfer = await Users.findOne({
    where: {
      status: true,
      id: senderUserId,
    },
  });
  //5 verificar si el monto a transferir es mayor al monto que tiene el userMakeTransfers enviar error 400
  if (amount > userMakeTransfer.amount) {
    return res.status(400).json({
      status: 'error',
      message:
        'The sending account does not have the amount necessary to make the transfer.',
    });
  }
  //6. verificar si el id del usuario que recibe es igual al id del usuario que envia, enviar un error
  if (receiverUserId == senderUserId) {
    return res.status(400).json({
      status: 'error',
      message: 'Cannot self-make a transfer',
    });
  }
  //7 crear una constante que se llame newAmountUserMakeTransfer(tendra el resultado de la resta de monto de usuario - el monto se recibe de la req.body)
  const newAmountUserMakeTransfer = userMakeTransfer.amount - amount;
  //8 crear una constante que se llame newAmountUserReceiver(tendta el result de la suma entre el monto que tiene el usuario en la cuenta mas el monto que se recibe del req.body)
  const newAmountUserReceiver = userReceiver.amount + amount;
  //9 actualizar la informacion del usuario que envia con su nuevo amount
  await userMakeTransfer.update({ amount: newAmountUserMakeTransfer });
  //10 actualizar la informacion del usuario que recibe con su nuevo amount
  await userReceiver.update({ amount: newAmountUserReceiver });
  //11 guardar o crear la tranferesncia en la base de datos
  const transferSuccess = await Transfers.create({
    amount,
    senderUserId,
    receiverUserId,
  });
  //12 enviar la respuesta al cliente que diga que la tranferencia se hizo exitosamnete
  return res.status(200).json({
    status: 'success',
    message: 'Transfer was done successfully',
    transferSuccess,
  });
};
