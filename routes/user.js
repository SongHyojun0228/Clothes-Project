const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const db = require('../data/database');

router.get('/sign-up', function(req, res) {
    res.render('sign-up');
});

router.post('/sign-up', async function(req,res) {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    const enteredConfirmPassword = req.body.confirmpassword;
    const enteredName = req.body.name;
    const enteredNickName = req.body.nickname;

    const hashedPassword = bcrypt.hash(enteredPassword, 12);

    const newUser = {
        email : enteredEmail,
        password : enteredPassword,
        name : enteredName,
        nickname : enteredNickName,
    }

    const result = await db.getDb().collection('users').insertOne(newUser);
    console.log(result);

    res.redirect('/');
});

module.exports = router;