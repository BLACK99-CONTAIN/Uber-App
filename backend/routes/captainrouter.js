const express=require('express');
const router=express();
const {body}=require('express-validator');
const captainuser=require('../models/captainuser.js');
const captaincontroller=require('../controller/captaincontroller.js');
const { jwtMiddleware, generatetoken } = require('./../jwt');

router.post('/register', [
    body('username.firstname').isLength({ min: 5 }).withMessage('Firstname should have 5 characters'),
    body('username.lastname').isLength({ min: 2 }).withMessage('Lastname should have 2 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 4 }).withMessage('Password should be at least 4 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color should have 3 characters'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate should have 3 characters'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity should be a number'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
    ],captaincontroller.registercaptainUser);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:4}).withMessage('Password should be at least 4 characters')
],captaincontroller.logincaptainUser);

router.get('/profile',jwtMiddleware,captaincontroller.getcaptainProfile);
module.exports=router;    