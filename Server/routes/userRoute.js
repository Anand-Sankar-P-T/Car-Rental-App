const express = require('express')
const {register,login,profile,updateProfile}=require('../controllers/userController')
const authUser=require('../middlewares/userAuth')
const userRouter = express.Router()

//register
userRouter.post('/register',register)
//login
 userRouter.post('/login',login)
// //logout
// userRouter.post('/logout')
// //profile
userRouter.get('/profile', authUser, profile);
userRouter.put('/update', authUser, updateProfile);
// //delete
// userRouter.delete('/delete/:userId')
// //checkUser
// userRouter.post('/checkUser')

module.exports=userRouter