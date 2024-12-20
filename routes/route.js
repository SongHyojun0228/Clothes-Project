const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/addclothes', function(req, res) {
    res.render('addclothes');
});

router.get('/brand', function(req, res) {
    res.render('brand');
});

router.get('/denim', function(req, res) {
    res.render('denim');
});

router.get('/about', function(req, res) {
    res.render('about');
});

router.get('/episode1', function(req, res) {
    res.render('episode1');
});

router.get('/episode2', function(req, res) {
    res.render('episode2');
});

router.get('/episode3', function(req, res) {
    res.render('episode3');
});

router.get('/stockist', function(req, res) {
    res.render('stockist');
});

module.exports = router;