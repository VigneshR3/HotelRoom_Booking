const express = require('express')
const { UserRegisters, UserLogin, IsCheck_UserISAdmin } = require('../Controllers/UserController')
const Router = express.Router()

Router.post('/create',UserRegisters)
Router.post('/login',UserLogin)
Router.get('/is-admin',IsCheck_UserISAdmin)


module.exports = Router