const express = require('express');

const app = express();

const path = require('path');

const defaultRouter = require('./routes/route'); 
const addRouter = require('./routes/add'); 
const wishRouter = require('./routes/wish'); 

const db = require('./data/database');

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRouter);
app.use('/', addRouter);
app.use('/', wishRouter); 

app.use((req, res) => {
    res.status(404).render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).render('500');
});

db.connectToDatabase().then(function () {
    app.listen(3000);
});
