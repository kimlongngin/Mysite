
/*
    app.js Description (23/05/2014):

    Des: app.js is a file can involve all action throws it.
        this file was created when we crete new project directory combine node.js with 
        express framework .
        Express framework using verson :4.0.0 
    Object :
        1. Upload file using connect-multiparty npm module beside express framework
           so we must install it by commandline : sudo npn install connect-multiparty 
        2. Create countdown in indexview 
        3. Upload file in homepage views
        .......
        .......
    controller : 
        1. Index.jade : Control on countdown, retrieve answers from member, gift description
        2. home.jade  : allow member upload file to challeng new generation
        3. Login URL  : allow member upload and redirect to clientHome, client Activated 
        .......
        .......
*/

var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser     = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/user');
var memberRoutes=require('./routes/member');
var challengRoutes=require('./routes/challenge');
var http = require('http');
var fs=require('fs');
var sio = require('socket.io');
var reload = require('reload');
app.listen(8080);
var server = http.createServer(app);




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(bodyParser());// pull information from html in POST
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(require(methodOverride());
app.use(bodyParser({keepExtensions: true,uploadDir: __dirname +'/ temp' })); 
app.use(bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'/files')}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
// Routes  by get Method#
app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/register', routes.register);
app.get('/clientHome', routes.clientHome);
app.get('/clientActivated', routes.clientActivated);
app.get('/second', routes.second); // second page after home page countdown timer

app.get('/sendNumber', memberRoutes.AddnewQuizzNumber);


// Request by Post Method 
app.post('/register', routes.registers);
app.post('/login', routes.mylogin); // Login on home page  2014-05-08


var multipart = require('connect-multiparty');// enctype='multipart/form-data'
var multipartMiddleware = multipart(); 
app.post('/myUpload',multipartMiddleware,routes.myUpload);


/*+++++++++++++++++++++++++++ Challeng Route Involve ++++++++++++++*/

app.get('/challengPhoto',challengRoutes.ChallengePhoto);
app.get('/challengeQuizz',challengRoutes.ChallengeQuizz);
app.get('/challengeGoods',challengRoutes.ChallengeGoods);
app.get('/challengeHistory', challengRoutes.ChallengeHistory)
app.get('/view',challengRoutes.Views)
app.get('/profileEdit',challengRoutes.profileEdits)
app.get('/updateAdvertise', challengRoutes.UpdateAdvertise);
app.post('/updateAdvertise', challengRoutes.UpdateChallengePost);
app.post('/profileEdit', challengRoutes.profileEditClient);

/*+++++++++++++++++++ Upload file ++++++++++++++++++++++++++++++*/

var multipart = require('connect-multiparty');// enctype='multipart/form-data'
var multipartMiddleware = multipart(); // Create new object from module multipart


/*+++++++++++++++++++ Block Member Space ++++++++++++++++++++++++*/
app.get('/memberHome', memberRoutes.memberHome);
app.get('/memberAdvertise', memberRoutes.memberAdvertise);
app.get('/memberspace', memberRoutes.memberspace);
app.get('/myquizz',memberRoutes.myquizz);
app.get('/newquizz', memberRoutes.newquizz);
app.get('/challengiz',memberRoutes.Challengiz);
app.get('/editQuizz', memberRoutes.EditQuizz);
app.post('/editQuizz', memberRoutes.EditQuizzPost);


app.post('/memberAdvertise',memberRoutes.memberAdvertiseDelUp);
app.post('/memberspaceAdd', memberRoutes.memberspaceAdd);
app.post('/myquizz',memberRoutes.myquizzDelUp);
app.post('/newquizz', memberRoutes.AddnewQuizz);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




var io = sio.listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Wellcome!")
    socket.on('user image', function (msg) {
        //Received an image: broadcast to all
        socket.broadcast.emit('user image', socket.nickname, msg);
    });
    socket.on('user message', function (msg) {/*See source code*/});
    socket.on('nickname', function (msg) {/*See source code*/});
});

var countdown = 1000;
setInterval(function() {
  countdown--;
  io.sockets.emit('timer', { countdown: countdown });
}, 1000);

module.exports = app;
