const express = require('express')
const {register,login,profile,updateProfile,checkUser}=require('../controllers/userController')
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
userRouter.get('/check-user',authUser,checkUser);
// //delete
// userRouter.delete('/delete/:userId')
// //checkUser
// userRouter.post('/checkUser')

module.exports=userRouter