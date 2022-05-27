const User = require('../models/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// Login 기능
// model folder/User.js(usertable)에 접근해서 User 정보 가져온 후 비밀번호 검증 : bcrpy(req.body.password) == user.password
// 통과하면 JWT 생성 : JWT.sign(payload, secret, options)
const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });
    // user= {
    //     mail: 'marek1@gmail.com',
    //     username: 'Marek',
    //     password: '$2a$10$VXXeOc7B9OrOdSzc.e.GGuCuChYJpRxuczC.K5s8eLO4g38/tdiXS',
    //   }
    if (user && (await bcrypt.compare(password, user.password))) {
      //db.user && req.body.password == db.user.password
      console.log('user', user);
      console.log('password', password);
      console.log('user.password', user.password);
      //send new token
      const token = 'JWT_TOKEN';
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
        },
      });
    }
    return res.status(400).send('invalid credentials');
  } catch (err) {
    return res.status(500).send('something went wrong');
  }

  //   res.send('login route');
};
module.exports = postLogin;
