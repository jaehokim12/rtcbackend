const User = require('../models/user');
const bcrypt = require('bcryptjs');

// postRegister : 1. try -> client에서 요청받은 req.body 에서 username, email,pasword 추출;
// 1.1 email 있으면 이미 아이디 있음 -> userExists -> return 409 E-mail already in use.
// 1.2 email 없으면 계정 생성 : password 암호화 후 -> 1.2.1 encryptePassword에 담음 1.2.2
const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    //check if user exists
    const userExists = await User.exists({ mail: mail });

    if (userExists) {
      return res.status(409).send('E-mail already in use.');
    }
    const encryptePassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptePassword,
    });
    // create JWT token
    const token = 'JWT TOKEN';
    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
      },
    });
    // create user document and save in database
  } catch (err) {
    return res.status(500).send('Error occured please retry');
  }
};
module.exports = postRegister;
