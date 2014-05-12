
/*
 * GET home page.
 */
/*var client_data = require('../challengiz'); */
var express = require('express');

var app = express();
//Directory to upload file
var uploadPath="upload";




var mongodb = require('mongodb');
var MONGODB_URI = 'mongodb://dbchallengiz:12345@ds037758.mongolab.com:37758/dbchallengiz?w=1';
var db;
var coll;
var sas_origin_coll;
var giftcoll;


// Initialize connection once
mongodb.MongoClient.connect(MONGODB_URI, function(err, database) {
  if(err) throw err;
  db = database;
  coll = db.collection('client'); 
  sas_origin_coll = db.collection('sas_origines');
  giftcoll=db.collection('gift');
  console.log('connected');
});
 
/*coll.find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc)
      }
      else {
        res.end();
      }
    });
});*/


var count=60;
var i=0;
exports.index = function(req, res){
	i=i+1;
	
		coll.find().toArray(function(err, docs) {
			if(err)
			{
				console.log(err)
			}else{
			
				if(req.method==='GET'){		
						clearInterval();
						setInterval(function(){
							if(count <=0)
							{
							
								clearInterval(count);

							}else{
								count--;
								//console.log("Count:"+count);
							}
						},1000)

					res.render('index', { title: 'index',countNum: count, dataclient:docs});
				}
			}
		})
	

};





exports.home = function(req, res){
	coll.find().toArray(function(err, docs) {
		if(err)
		{
			console.log(err)
		}else{
		    console.dir(docs);
			if(req.method==='GET'){	
				res.render('home', { title: 'home',dataclient:docs});
			}
		}
		//db.close();
	})
};

exports.register = function(req, res){
	if(req.method==='GET'){
		sas_origin_coll.find().toArray(function(error, sas_result){
			if(error)
			{
				console.log(error)
			}else{
				console.log(sas_result)
				res.render('register', { title: 'Register', sas:sas_result});
			}
		})
	}
};


  
// this code should be executed when the client receives a message from the server.




exports.registers = function(req, res)
{


	if(req.method ==='POST'){

	  var txtorigine = req.body.txtname_orgine;
	  var txtst = req.body.txtst;
	  var sex =req.body.sex;
	  var txtfamily_name = req.body.txtfamily_name;
	  var txtlastname =req.body.txtlastname;
	  var txtaddress =req.body.txtaddress;
	  var txtcity =req.body.txtcity;
	  var country_id = req.body.country_id;
	  var txtemail =req.body.txtemail;
	  var txttel =req.body.txttel;
	  var txtpwd =req.body.txtpwd;	
	  var txtcp = req.body.txtcp;
	  var txt_con_pwd =req.body.txt_con_pwd;
	  var txtcon_email =req.body.txtcon_email;

	if(txtpwd == txt_con_pwd && txtemail==txtcon_email){

		coll.save({
	        society_name: txtorigine,
		    siren: txtst,
		    name: txtlastname,
		    surname: txtfamily_name,
		    sex:sex,
		    email: txtemail,
		    password: txtpwd,
		    tel: txttel,
		    address: txtaddress,
		    postal_code: txtcp,
		    city: txtcity,
		    country: country_id,
		    is_activated: 0,
		    creation_date:new Date()


		  }, function( error, docs) {
		        res.redirect('/')
		  });
	
	}
	else{
		res.redirect('/register')
	}
 }
}

/*++++++++++++++++++++++ Get the gift show on home page +++++++++++++++++++++++++++*/

exports.prochaindefiHome = function(req, res){

	if(req.method==='GET'){	
		giftcoll.find().limit(2).toArray(function(error, gift_result){
			var par1=gift_result[0].img;
			var par2=gift_result[1].img;
			if(error)
			{
				console.log(error)
			}else{

				console.log("Procahin Defi start");
				console.log(gift_result);
				res.render('prochaindefiHome', { title: 'Prochain Defi',gift1: par1, gift2: par2});
			}
		})
	}

}
	
function oc(a){
	var o = {};
	for(var i=0;i<a.length;i++) {
	o[a[i]]='';
	}
	return o; 
}



// +++++++++++++++++ Login Module ++++++++++++++++++++++++

exports.indexheads = function(req, res)
{
	var txtusername = req.body.txtusername;
	var txtpwd=req.body.txtpwd;
	coll.find({email:txtusername, password:txtpwd}).toArray(function(err, docs) {
		console.log(docs);
		if(docs.length >0 )
		{
			res.render('prochaindefiHome', { title: 'Prochain Defi'});
			//res.redirect('/prochaindefiHome');
		}
	});
}
 
// Prochain - Defi

exports.prochaindefiActivated  = function(req, res)
{
	if(req.method==='GET')
	{
		giftcoll.find().limit(2).toArray(function(error, gift_result){
			var par1=gift_result[0].img;
			var par2=gift_result[1].img;
			if(error)
			{
				console.log(error)
			}else{
				console.log("Procahin Defi start");
				console.log(gift_result);
				res.render('prochaindefiActivated',{title:'prochaindefiActivated',gift1: par1, gift2: par2})
			}
		})
	}

}

/*exports.prochaindefiActivated = function(req, res,error)
{
	if(req.method ==='POST'){

		 var txtorigine = req.body.txtname
		 var uploadDir = __dirname + '/public/uploads/'
		 console.log(txtorigine)
		 console.log(uploadDir)
	
	}
}*/

exports.prochaindefiLegagnant  = function(req, res)
{
	if(req.method==='GET')
	{
		res.render('prochaindefiLegagnant',{title:'prochaindefiLegagnant'})
	}
} 




// ++++++++++++++++++++++ Login ++++++++++++++++++
exports.mylogin = function(req, res)
{
	console.log('Start Login');
    var txtusername = req.body.txtusername;
    var txtpwd=req.body.txtpwd;
    console.log("mYname:"+txtusername+","+txtpwd)
    coll.find({email:txtusername, password:txtpwd}).toArray(function(err, docs) {
        console.log(docs);
        if(docs.length >0 )
        {
            //res.render('prochaindefiHome', { title: 'Prochain Defi'});
            res.redirect('/prochaindefiHome');
        }
    });
}



/*++++++++++++++++++++++ Upload Image +++++++++++++*/

var formidable = require('formidable'),
		c = require('config'),
		fs = require('fs');

exports.upload = function(req, res){
	
	var form = new formidable.IncomingForm();
	
	// Parse file.
  form.parse(req, function(err, fields, files) {
  	
  	if(files.file){
			
			// Read file.			
			fs.readFile(files.file.path, function(err, data){

		  	// Save file.
				fs.writeFile(c.config.appPath + '/content/files/' + 
					files.file.name, 
					data, 
					'utf8', 
					function (err) {
						if (err){
							// throw err;
							res.writeHead(200, {'content-type': 'text/plain'});
							res.write(JSON.stringify({
								isSucessful: false,
								message: 'Something went wrong!'					
							}));
							res.end();
						} else {
							// Sucess.
							res.writeHead(200, {'content-type': 'text/plain'});
							res.write(JSON.stringify({
								isSucessful: true,
								message: 'File was saved!'
							}));
							res.end();
						}
				});
			});
		} else {
			res.writeHead(200, {'content-type': 'text/plain'});
			res.write(JSON.stringify({
				isSucessful: false,
				message: 'Did not receive any file!'					
			}));
			res.end();
		}
  });
};



var fs = require('fs');
var path = require('path');

	
exports.uploadFile = function(req, res, files)
{
	// all environments
	app.use(bodyParser({
	keepExtensions: true,
	uploadDir: __dirname +'/ temp' })); 

	//get the file name
	var filename=req.files.file;
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

}

function oc(a){
	var o = {};
	for(var i=0;i<a.length;i++) {
	o[a[i]]='';
	}
	return o; 
}	

	
