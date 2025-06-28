const express = require('express')
const router = express.Router()
const userRouter=require('./userRoute')
const adminRouter = require('./adminRoute')
const dealerRouter=require('./dealerRoute')
const bookingRouter=require('./bookingRoute')

router.use('/user',userRouter)
router.use('/admin',adminRouter)
router.use('./dealer',dealerRouter)
router.use('./book',bookingRouter)

module.exports=router