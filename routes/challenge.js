
/*var con = require('./connection.js'); // Call file store connection module 
con.colls();// Create connection and get all paramenter table */

var con = require('./connection.js'); // Call file store connection module 
var express=require('express');
var app=express();
var open =require('open'); // using open npm module "sudo npm install open"
var _=require('underscore'); // Using underscore.js module "sudo npm install underscore"
var reload = require('reload');
var http=require('http');
var server = http.createServer(app);
var Cookies =require('cookies');
var urlencode = require('urlencode');
var _underscore=require('underscore');
var bodyParser     = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var builder = require('mongo-sql');
var fs=require('fs');

app.use(bodyParser());


exports.ChallengePhoto=function(req,res,key)
{
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		var num="";
		num = req.param('num');
		if(num=="" || num==0 || num==null)
		{
			//console.log("false")
			num=1;
		}
		if(num>6)
		{
			res.redirect("/error");
		}

		con.giftcoll.find().toArray(function(err,result){
			if(err){
				console.log("Error")
				console.log(err)
			}else{
				console.log("Result");
				console.log(result);
				res.render('challengPhoto',{title:"Challeng Photo",number:num,data:result});
			}
			
		});
				
	}
}

exports.ChallengePhotoPost=function(req,res)
{
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		

	}
}


exports.ChallengeQuizz=function(req,res,key)
{
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		var num="";
		num = req.param('num');
		if(num=="" || num==0 || num==null)
		{
			//console.log("false")
			num=1;
		}
		if(num>6)
		{
			res.redirect("/error");
		}

		con.giftcoll.find().toArray(function(err,result){
			if(err){
				console.log("Error")
				console.log(err)
			}else{
				console.log("Result");
				console.log(result);
				res.render('challengeQuizz',{title:"Challeng Photo",number:num,data:result});
			}
			
		});
				
	}
}





exports.ChallengeGoods=function(req,res,key)
{
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		var num="";
		num = req.param('num');
		if(num=="" || num==0 || num==null)
		{
			//console.log("false")
			num=1;
		}
		if(num>6)
		{
			res.redirect("/error");
		}

		con.giftcoll.find().toArray(function(err,result){
			if(err){
				console.log("Error")
				console.log(err)
			}else{
				console.log("Result");
				console.log(result);
				res.render('challengeGoods',{title:"Challeng Photo",number:num,data:result});
			}
			
		});
				
	}
}



exports.ChallengeHistory=function(req,res,key)
{
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		res.render('challengeHistory',{title:"Challeng Photo"});
	}
}


exports.Views=function(req,res)
{
	res.render('view');
}

exports.profileEdits=function(req,res)
{
	console.log("Hi")
	var firstname=req.query.firstname;
	var lastname=req.query.lastname;
	var tel=req.query.tel;
	var email=req.query.email;
	res.render('profileEdit',{firstname:firstname,lastname:lastname,tel:tel,email:email});
}

exports.profileEditClient=function(req,res,key,data)
{

	//console.log("Profile:"+profile);
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log("CLIENT ID:"+id);

	var txtfirstname=req.body.txtfirstname;
	var txtlastname=req.body.txtlastname;
	var txtemail=req.body.txtemail;
	var txtconfirmemail=req.body.txtconfirmemail;
	var txttel=req.body.txttel;
	var password=req.body.txtpassword;
	var imgname =req.body.f2;
	var confirmpassword=req.body.txtconfirmpassword;
	

	console.log(txtfirstname);
	console.log(txtlastname);
	console.log(txtemail);
	console.log(txtconfirmemail);
	console.log(txttel);
	console.log("Pass:"+password);
	console.log("Confimrm Pwd:"+confirmpassword);
	console.log(imgname);
	
	console.log("++++++++++++++++++++++++++++++++++++++++");

	/*fs.readFile(
        path.join(__dirname, '../Calendar.png'),
        function (err, data) {
            res.render('index', {
                title: 'Express',
                src: data.toString('base64')
            });
    })*/
	

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		

		if(_underscore.isEqual(txtemail,txtconfirmemail) && _underscore.isEqual(password,confirmpassword)){
			console.log("Start Inserting...!");

			con.coll.update({"_id" : ObjectId(id)},
				{$set:{
					"surname":txtfirstname,
					"name":txtlastname,
					"email":txtemail,
					"pwd":password,
					"txttel":txttel
				}
			},{ multi: true },function(err){
				if (err ){
					console.log("Error");
					console.log(error)
				}else
				{
					res.links({
					  next: 'http://locahost:8080/profileEdit/users?page=2',
					});
					//res.clearCookie('IDLogin');
					res.redirect('/memberhome');


				}
			})

			
		}else
		{
			console.log("Error!");
		}
		
	}
		
}


exports.UpdateAdvertise=function(req,res)
{
	res.render("updateAdvertise",{title:"Update Advertise"});
}

exports.UpdateChallengePost=function(req,res,key)
{
	console.log("Update Challenge Post Executing...!");

	var objectId=new ObjectId();
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);

	var pubid=req.body.mypubid;
	console.log("Pub Id:"+pubid);

	var titre=req.body.txttitre;
	var url=req.body.txturl;
	var file1=req.body.f1;
	var file2=req.body.f2;
	var file3=req.body.f3;
	var file4=req.body.f4;
	var file5=req.body.f5;

	console.log(titre);
	console.log(url);
	console.log(file1);
	console.log(file2);
	console.log(file3);
	console.log(file4);
	console.log(file5);

	var video1=req.body.xvideo1;
	var dis_logo=req.body.optlogo;
	var dis_optpublish=req.body.optpublish;
	var dis_optimagedefi=req.body.optimagedefi;
	var dis_optlafin=req.body.optlafin;

	
				if(id=="" || id==0){
					console.log("Please login!");                                                            
				}else{
					/*console.log("MyId:");
					var objectId = new ObjectId();
					console.log(objectId);*/

					//con.pub.save({"content":[file1,file2,file3,file4,file5]});

					console.log("Start Sending...");

					con.coll.update({_id:ObjectId(id)},{$pull:{"pubtype":{"pubid":ObjectId(pubid)}}},function(error,result){
						if(error)
						{
							console.log("You get Error");
							console.log(error);
							
						}else
						{
							con.coll.update({_id:ObjectId(id)},{$push:{"pubtype":{
								"pubid":pubid,
								"photoname":titre,
								"description": url,
								"title": titre,
								"content": [
					                file1,
					                file2,
					                file3,
					                file4,
					                file5
					            ],
								"video":video1,
								"url":url,
								"votre_logo":dis_logo,
								"pub_logo":dis_optpublish,
								"pub_defi_logo":dis_optimagedefi,
								"pub_image_logo":dis_optlafin

								},
								//"quizz": {}
							},

							},
								function(error){
									if(error){
										console.log("You get error while Editing...!");
										console.log(error);
									}else
									{
										console.log("You get success while Editing...!");
										res.redirect('/memberAdvertise');
									}
								}
							);
						}
					});


					
					


				}
}