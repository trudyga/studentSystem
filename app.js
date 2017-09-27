const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const affair = path.join(__dirname, './models/storage/mongoDb/schemas/affairSchema');
const report = path.join(__dirname, './models/storage/mongoDb/schemas/reportSchema');
const user = path.join(__dirname, './models/storage/mongoDb/schemas/userSchema');
const config = require('./config.json');

const debug = require('debug')('students-system:app');

const users = require('./routes/users');
const affairs = require('./routes/affairs');
const session = require('./routes/session');

const app = express();
const port = process.env.PORT || 3000;

debug("App created");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/users', users);
app.use('/session', session);
app.use('/affairs', affairs);


app.get('/', function (req,res) {
    res.send("Hello");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    debug(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function connect () {
    let options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db, options).connection;
}

function listen() {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

module.exports = app;
