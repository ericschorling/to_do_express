'use strict'
const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs');
const User = require('../models/userLogs');

router.get('/', async (req, res) =>{
    if(req.session.is_logged_in){
        res.redirect('/')
    }else{
        res.render('template', {
            locals: {
                title:'Sign Up',
            },
            partials: {
                partial:'partial-signup'
            }
        })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const { first_name, last_name, email, password } = req.body;
    //SALTing the HASH
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const userInstance = new User(null, first_name, last_name, email, hash)
    userInstance.save().then(response =>{
        if (response.id !== undefined){
            res.redirect('/login')
        }else {
            res.redirect('back')
        }
    })
})

module.exports = router