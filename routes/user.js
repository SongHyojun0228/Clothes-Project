const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const db = require('../data/database');

router.get('/sign-up', function(req, res) {
    res.render('sign-up');
});

module.exports = router;