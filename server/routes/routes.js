const express = require('express')
const router = express.Router()
const cors  = require('cors')
const dotenv = require('dotenv').config()
const {userRegister,userLogin,putClip,getClip} = require('../controllers')

//middleware

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })


)
router.post('/register',userRegister)
router.post('/login' ,userLogin)
router.post('/pastepage',putClip)
router.post('/copypage',getClip)
module.exports=router