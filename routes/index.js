
/*
 * GET home page.
 */

var con = require('./connection.js'); // Call file store connection module 
con.colls();// Create connection and get all paramenter table 
var express=require('express');
var app=express();
var open =require('open'); // using open npm module "sudo npm install open"
var _=require('underscore'); // Using underscore.js module "sudo npm install underscore"
var reload = require('reload');
var http=require('http');
var server = http.createServer(app);
var session = require('express-session');
var cookie = require('cookie-parser');
var Cookies =require('cookies');



/*+++++++++++++++++++++++++ General Block ++++++++++++++++++++*/
var homecount=60;
var homei=0;
exports.home = function(req, res, files){

		con.giftcoll.find({is_activated:0}).limit(2).toArray(function(err, gift_result) {
			if (gift_result.length<=0)
			{
			
				res.render('home', { title: 'home',countnum:homecount, gift1:"no-gift-7.jpg", gift2:"no-gift-7.jpg"});		
			
			}else{	

				var gift1=gift_result[0].img;
				var gift2=gift_result[1].img;
				var gift_id1 = gift_result[0]._id;
				var gift_id2 = gift_result[1]._id;

				if(gift1<=0 || gift2<=0)
				{

					res.render('home', { title: 'home',countnum:homecount, gift1:"no-gift-7.jpg", gift2:"no-gift-7.jpg"});		
				
				}else{

					if(homei<=0){	
						var interval=setInterval(function(){
						homecount--;
						console.log(homecount);
			
						if(homecount<=0)
						{
							/*
							giftcoll.update({_id: gift_id1 }, { $set: { "is_activated": 1 } }, function(error, callback){
								if(error){
									console.log("Update Error 1");
								}else
								{
									console.log("Success Update 1");
								}
							});

							giftcoll.update({_id: gift_id2}, { $set: { "is_activated": 1 } }, function(req,res,error, callback){
								if(error){
									console.log("Update Error2");
								}else
								{
									console.log("Success Update 2");
									res.redirect('/home');
								}
							});
							*/

							clearInterval(interval);
							open('http://localhost:8080/second', function (err) {
							  if (err) throw err;
							});
						}													

					  },1000)
					  res.render('home', { title: 'home',countnum:homecount, gift1:gift1, gift2:gift2});				
					}else{
						console.log("You run me again!");
						console.log(homecount);
						res.render('home', { title: 'home',countnum:homecount, gift1:gift1, gift2:gift2});				
				
					}

			}
		}
	})	
	

}

/*+++++++++++++++++++ Call back function ++++++++++++++++++++++++*/
	/*
		console.log("Start callback...!");
		var myCallback = function(data) {
		  console.log('got data: '+data);
		};
		var usingItNow = function(callback) {
		  callback('get it?');
		};
		usingItNow(myCallback);
	*/




var i = 0;
var count=120;
var indexi=0;

function final() { console.log('Done'); }


exports.index = function(req, res){	
	con.coll.find().toArray(function(err, docs) {
		if(err)
		{
			console.log(err)
		}else{
		    console.dir(docs);
			if(req.method==='GET'){	
			con.giftcoll.find({is_activated:0}).limit(2).toArray(function(err, gift_result) {
				if (gift_result.length<=0)
				{
					res.render('index', { title: 'index',dataclient:docs,countnum:count, gift1:"no-gift-7.jpg", gift2:"no-gift-7.jpg"});		
				}else{	
					var gift1=gift_result[0].img;
					var gift2=gift_result[1].img;
					var gift_id1 = gift_result[0]._id;
					var gift_id2 = gift_result[1]._id;

				if(gift1<=0 || gift2<=0)
				{
					res.render('index', { title: 'index',dataclient:docs,countnum:count, gift1:"no-gift-7.jpg", gift2:"no-gift-7.jpg"});		
				}else{
					if(indexi<=0){
						var interval=setInterval(function(){
							indexi=indexi+1;
							count--;
							if(count <=0)
							{
								clearInterval(interval,0);
						/*+++++++++++ This module use for ooopen new page when time countdown till 0  +++++++++*/
					 			open('http://localhost:8080/home', function (err) {
								  if ( err ) throw err;
								});

								  setTimeout(function() {
								    console.log('This will not run');
								  }, 0);
							}
					    },1000)	
					    res.render('index', { title: 'index',dataclient:docs,countnum:count, gift1:gift1, gift2:gift2});
					}else{
						 console.log("You run me again!");
						 console.log(count);
						 res.render('index', { title: 'index',dataclient:docs,countnum:count, gift1:gift1, gift2:gift2});
					}

				}

			  }
			})	
		   }
		}
		
	})
};


var mycount=60;
var secondi=0;
exports.second = function(req, res, files){
	con.giftcoll.find({is_activated:0}).limit(2).toArray(function(err, gift_result) {
			if (gift_result.length<=0)
			{
				res.render('second', { title: 'second',countnum:mycount, gift1:"no-gift-7.jpg", gift2:"no-gift-7.jpg"});		
			}else{	
				var gift1=gift_result[0].img;
				var gift2=gift_result[1].img;
				var gift_id1 = gift_result[0]._id;
				var gift_id2 = gift_result[1]._id;
				
				if(gift1<=0 || gift2<=0)
				{
					res.render('second', { title: 'second',countnum:mycount, gift1:"no-gift-7.jpg", gift2:"no-gift-7.jpg"});		
				}else{
		
					if(secondi<=0){
				
						var interval=setInterval(function(){
							mycount--;
							
							if(mycount <=0)
							{
								clearInterval(interval);
								console.log("You Reload");
								reload(server,app);
							}

					  },1000)
						secondi=secondi+1;
					  	res.render('second', { title: 'second',countnum:mycount, gift1:gift1, gift2:gift2});
					}else
					{
						console.log("You run me again!");
						console.log(mycount);
						res.render('second', { title: 'second',countnum:mycount, gift1:gift1, gift2:gift2});
					}
				}
			}


	});	
};





/*++++++++++++++++++++++++++ Block Client ++++++++++++++++++++++*/
/*Get Client member when login to challengiz from client table*/
exports.register = function(req, res){
	if(req.method==='GET'){
		con.sas_origin_coll.find().toArray(function(error, sas_result){
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


/*
	1. Register Route: This route use for client create new 
	   account to join in challengiz
	2. Action: Only database and store in client table

*/
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
		con.coll.save({
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
		    creation_date:new Date(),
		    pubtype:[]
		  }, function( error, docs) {
		        res.redirect('/')
		  });
	
	}
	else{
		res.redirect('/register')
	}
 }
}


/* 
	1. clientHome Route: will occuring when user loing 
	2. Action : 
		2.1 clientHome's view will view gift picture 
		2.2 clientHome's view will view coutdown timer on the view
			to set challeng time to player.

*/


exports.clientHome = function(req, res)
{
	var cookies= new Cookies(req, res);
	console.log("COOKIE VALUE:"+ cookies.get('IDLogin'));

	if(req.method==='GET'){	
		con.giftcoll.find().limit(2).toArray(function(error, gift_result){
			console.log("result:"+gift_result[0].creation_date);
			var par1=gift_result[0].img;
			var par2=gift_result[1].img;
			if(error)
			{
				console.log(error)
			}else{
				console.log("Procahin Defi start");
				console.log(gift_result);
				res.render('clientHome', { title: 'Prochain Defi',gift1: par1, gift2: par2});
			}
		})
	}
}

/* 
	1. clientActivated Route: will occuring when user clientHome's count down timer 
							  coutn time equal 0 
	2. Action : 
		2.1 clientActivated's view will view gift picture 
		2.2 clientActivated's view will view coutdown timer on the view
			to set challeng time to player.
		2.3 clientActivated's view will provider permission to player
			can upload the gift's pictures to challeng
			
*/
exports.clientActivated = function(req, res)
{
	var count=120;
	if(req.method==='GET')
	{
		con.giftcoll.find().limit(2).toArray(function(error, gift_result){
			var par1=gift_result[0].img;
			var par2=gift_result[1].img;
			
			if(error)
			{
				console.log(error)
			}else{
				console.log("Procahin Defi start");
				console.log(gift_result);

				var interval=setInterval(function(){
						count--;
						if(count <=0)
						{
	
							clearInterval(interval);
						}													

				  },1000)

				res.render('clientActivated',{title:'clientActivated',countnum: count, gift1: par1, gift2: par2})
			}


		})
	}

}


// +++++++++++++++++ Login Module ++++++++++++++++++++++++

exports.indexheads = function(req, res)
{
	var txtusername = req.body.txtusername;
	var txtpwd=req.body.txtpwd;
	con.coll.find({email:txtusername, password:txtpwd}).toArray(function(err, docs) {
		console.log(docs);
		if(docs.length >0 )
		{
			res.render('prochaindefiHome', { title: 'Prochain Defi'});
			//res.redirect('/prochaindefiHome');
		}
	});
}
 
// Prochain - Defi


/*exports.prochaindefiActivated  = function(req, res)
{
	var count=120;
	if(req.method==='GET')
	{
		con.giftcoll.find().limit(2).toArray(function(error, gift_result){
			var par1=gift_result[0].img;
			var par2=gift_result[1].img;
			
			if(error)
			{
				console.log(error)
			}else{
				console.log("Procahin Defi start");
				console.log(gift_result);

				var interval=setInterval(function(){
						count--;
						if(count <=0)
						{
	
							clearInterval(interval);
						}													

				  },1000)

				res.render('prochaindefiActivated',{title:'prochaindefiActivated',countnum: count, gift1: par1, gift2: par2})
			}


		})
	}
}*/


exports.prochaindefiLegagnant  = function(req, res)
{
	if(req.method==='GET')
	{
		res.render('prochaindefiLegagnant',{title:'prochaindefiLegagnant'})
	}
} 


/*
	
	myUpload Route: this route extend from home view when client click on 
					button upload 
	Action 		  : The view will upload all picture or gift to Upload folder
					and will store the image name to gift table in our database

*/


var bodyParser= require('body-parser')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');

exports.myUpload=function(req,res)
{
	/*console.log(req.files.file.name);		
	console.log(req.files.file.path);	
	console.log("You are success!");*/

	var filename=req.files.file.name;	
	var extensionAllowed=[".docx","doc",".png",".jpg",".jpeg",". gif"];
	var maxSizeOfFile=1000;
	var msg="";
	var i = filename.lastIndexOf('.');
	// get the temporary location of the file
	var tmp_path = req.files.file.path;
	// set where the file should actually exists - in this case it is in the "images" directory
	/*var target_path = __dirname +'/Upload/' + req.files.file.name; */
	var target_path = 'public/Upload/' + req.files.file.name;
	console.log(target_path);
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

}

function oc(a){
	var o = {};
	for(var i=0;i<a.length;i++) {
		o[a[i]]='';
	}
	return o;
}



// ++++++++++++++++++++++ Login ++++++++++++++++++

/*
	mylogin Route: this route allow user or client make login 
					to view or create new challengiz in our program 
	Action 		 : check login and store session
*/

app.use(cookie());
app.use(session({ secret: 'keyboard cat'}));

exports.mylogin = function(req, res)
{
	

	console.log('Start Login');
    var txtusername = req.body.txtusername;
    var txtpwd=req.body.txtpwd;
    console.log("Session starting...");
   

    con.coll.find({email:txtusername, password:txtpwd}).toArray(function(err, docs) {
        console.log("+++++++++++++++++++++++++++++");
        console.log(docs);
        if(docs.length >0 )
        {
           //res.render('prochaindefiHome', { title: 'Prochain Defi'});
           res.cookie('EmailLogin', req.body.txtusername);
           res.cookie('EmailPwd', req.body.txtpwd);
           res.cookie('IDLogin', docs[0]._id)
        

           // res.session.txtusername = req.body.txtusername;
           res.redirect('/clientHome/?val=1');
          
          // res.redirect('/clientHome/?val=1');
        }else
        {
        	res.redirect('/clientHome/?val=0');
        }
    });

}








	
