const express=require('express')
const router=express()
const {body}=require('express-validator')
const usercontroller=require('../controller/user.controller')
const { jwtMiddleware, generatetoken } = require('./../jwt')

router.post('/register', [
    body('username.firstname').isLength({ min: 5 }).withMessage('Firstname should have 5 characters'),
    body('username.lastname').isLength({ min: 2 }).withMessage('Lastname should have 2 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 4 }).withMessage('Password should be at least 4 characters')
], usercontroller.registerUser);




module.exports=router