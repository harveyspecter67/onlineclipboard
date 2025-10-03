const express = require('express')
const router = express.Router()
const cors  = require('cors')
const dotenv = require('dotenv').config()
const {userRegister,userLogin,putClip,getClip, getProfile} = require('../controllers')
const { protect } = require ('../middleware/authMiddleware');
//middleware

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })


)
router.post('/register',userRegister)
router.post('/login' ,userLogin)
router.post('/pastepage',protect ,putClip)
router.post('/copypage', protect,getClip)
router.post('/profile', protect ,getProfile)
module.exports=router