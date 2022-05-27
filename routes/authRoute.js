const express = require('express')
const router = express.Router()
const authControllers = require('./authController')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    mail:Joi.string().email().required(),
})
const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12),
    mail:Joi.string().email(),
})

router.post('/register',validator.body(registerSchema),authControllers.controllers.postRegister)
// '/.../register' post 요청시 body param regitserChema : 하위 형식을 검사 통과시 함수실행 통과 못하면 validation error 발생
router.post("/login",validator.body(loginSchema),authControllers.controllers.postLogin)

module.exports = router;