const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.signupUser = catchAsync(async (req, res) => {
  //1.Obtener el name y password de la req.body
  const { name, password } = req.body;
  //2.Generar el numero de cuenta de 6 digitos(accountnumber-math.random)
  const accountNumber = Math.round(Math.random() * 999999);
  //3.crear una constante que se llame amount q debe tener un valor de 1000
  const amount = 1000;
  //4.Crear el usuario con el name, accountNumber, password, amount
  const newUser = await Users.create({
    name: name.toLowerCase(),
    password,
    amount,
    accountNumber,
  });
  //5.Enviar la respuesta al cliente
  return res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    newUser,
  });
});
exports.loginUser = catchAsync(async (req, res) => {
  //1.Recibir el password y accountNumber de la req.body
  const { password, accountNumber } = req.body;
  //2.Buscar el usuario donde el status:true,accountNumber q reciba sea igual a la cuenta q estoy buscando
  const newLogin = await Users.findOne({
    where: {
      status: true,
      password,
      accountNumber,
    },
  });

  //3.enviar la respuesta al cliente
  res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    newLogin,
  });
});
