const express = require('express');
const router = express.Router();
const{ensureAuthenticated,ensureGuest} = require('../config/auth');

router.get('/',ensureGuest,(req,res)=>{
    res.render('index/home');
})

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('index/dashboard');
})
router.get('/about',(req,res)=>{
    res.render('index/about');
})



module.exports = router;