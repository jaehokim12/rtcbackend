const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// postRegister : 1. try -> client에서 요청받은 req.body 에서 username, email,pasword 추출;
// 1.1 email 있으면 이미 아이디 있음 -> userExists -> return 409 E-mail already in use.
// 1.2 email 없으면 계정 생성 : password 암호화 후 -> 1.2.1 encryptePassword에 담음 1.2.2
const postRegister = async (req, res) => {
  try {
    // console.log('req.body', req.body);

    const { username, password, mail } = req.body;
    console.log('TOKEN_KEY', process.env.TOKEN_KEY);
    //check if user exists
    const userExists = await User.exists({ mail: mail.toLowerCase() });

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
    // _id => mongodb / user/_id column : objectid("values like:asdfa14123")
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      }
    );
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
