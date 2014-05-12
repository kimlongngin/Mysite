

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();
var routes = require('./routes/index');
var users = require('./routes/user');


var format = require('util').format;
var http = require('http');
var fs = require('fs');
/*var challengizProvider = require('./challengiz');*/

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser());// pull information from html in POST
app.use(logger('dev'));
           
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser({keepExtensions: true,uploadDir: __dirname +'/ temp' })); 
app.use(methodOverride()); 
// Routes  by get Method#

app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/register', routes.register);
app.get('/prochaindefiHome', routes.prochaindefiHome);
app.get('/prochaindefiActivated',routes.prochaindefiActivated);
app.get('/prochaindefiLegagnant', routes.prochaindefiLegagnant);

// Request by Post Method 
app.post('/register', routes.registers);
app.post('/prochaindefiHome',routes.prochaindefiHome);

app.post('/login', routes.mylogin); // Login on home page  2014-05-08
//app.post('/upload', routes.uploadFile);// Upload file 2014-05-08

app.post('/upload', function(req,res){
    console.log('Start uploading...')
    app.use(bodyParser({
    keepExtensions: true,
    uploadDir: __dirname +'/ temp' })); 

    //get the file name
    var filename=req.file.file.name;
    console.log(filename);

    var extensionAllowed=[".docx","doc","png","jpg","jpeg"];
    var maxSizeOfFile=100;
    var msg="";
    var i = filename.lastIndexOf('.');
    // get the temporary location of the file
    var tmp_path = req.files.file.path;
    console.log(tmp_path);

    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = __dirname +'/Upload/' + filename; 
    var file_extension= (i < 0) ? '' : filename.substr(i); 
    if((file_extension in oc(extensionAllowed))&&((req.files.file.size /1024 )< maxSizeOfFile)){ 
    fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err; 
    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files 
    fs.unlink(tmp_path, function() {
    if (err) throw err;
    });
    });
    msg="File uploaded sucessfully" 
    }else{
    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files 
    fs.unlink(tmp_path, function(err) {
    if (err) throw err;
    });
    msg="File upload failed.File extension not allowed and size must be less than "+maxSizeOfFile; 
    }
    res.end(msg);
    res.redirect('/prochaindefiHome');
    
});
function oc(a){
    var o = {};
    for(var i=0;i<a.length;i++) {
    o[a[i]]='';
    }
    return o; 
}




/*++++++++++++++++++ The page login to register for client ++++++++++++++++++*/





/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

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

app.listen(8080)

module.exports = app;
