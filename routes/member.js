
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
var io = require('socket.io')(http);
var builder = require('mongo-sql');

app.use(bodyParser());
app.use(bodyParser.urlencoded());

// Select * from table client
var usersQuery = {
  type: 'select'
, table: 'client'
};

var result = builder.sql(usersQuery);
result.toString() // Sql string value
console.log(result);


exports.memberHome = function(req, res, key){	
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
		con.coll.find({_id:ObjectId(id)},{name:1,surname:1,address:1,tel:1,email:1}).toArray(function(err, docs) {
			console.log(docs);
			res.render('memberhome',{data:docs, title:"Member"});
		})
	}	
}




function PubClient(myid) {

	console.log("client");
	console.log(myid);
    var client = con.coll.findOne({_id: myid})
    client.pubcoll = con.pubcoll.find({client_id: myid}).toArray(function(err, doc){
   	   console.log(doc);
    })    
}



exports.memberAdvertise=function(req,res, key)
{
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);

	if(id=="" || id==0 || id==null || id.length<24){
		console.log("Please login!");  
		res.sendfile('ViewErrorPage.jade');                                                        
	}else{

		con.coll.find({_id:ObjectId(id)}).toArray(function(err, clientDocs) {
			console.log(clientDocs);		
			res.render('memberAdvertise', {title:"Member Advertise",doc:clientDocs});
		})

	}
}



/*++++++++++++++++++++Test a socket.io web socket +++++++++++++++++++*/
exports.ViewErrorPage=function(req,res)
{
	res.render('ViewErrorPage',{title:"Web Socket"});
}




/*if(clientDocs.length<=0)
{
	console.log("memberAdvertise not yet executed!");
}else
{
	console.log("Executed");	
}*/


exports.memberAdvertiseDelUp=function(req,res,key)
{
	console.log("Member Advertise Click delete and Update!");
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);

	var arr=req.body.chkcheck;
	
	console.log("Public ID:"+arr);

	//PubClient(id)

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		if(req.body.btnedit=="EDIT")
		{
			if(_underscore.isArray(arr)){
				console.log("You can't update this field");
				res.redirect('/memberAdvertise');
			}else if(arr==0 || arr==null || arr=="")
			{
				console.log("Starting Update!");
				res.redirect('/memberAdvertise');
				//con.coll.update({_id:ObjectId(id)},{})
			}
			else
			{
				console.log("no array");
				res.render('updateAdvertise',{pubid:arr});
			}

		}else
		{
			
			if(_underscore.isArray(arr)){
				console.log("con 1 start ");
				for(var i=0;i<arr.length;i++)
				{
					con.coll.update({_id:ObjectId(id)},{$pull:{"pubtype":{"pubid":ObjectId(arr[i])}}},function(error,result){
						console.log("del id:"+arr[i]);
					});
				}
			}else{
				console.log("con 2 start");
				con.coll.update({_id:ObjectId(id)},{$pull:{"pubtype":{"pubid":ObjectId(arr)}}},function(error,result){
						console.log("del id 2:"+arr);
				});
			}
				
			res.redirect('/memberAdvertise');
		}
		
	  	}
}

/*++++++++++ Block add new advertising ++++++++++++++++++++++++*/
// This route use for controll on the memberspace.jade view

exports.memberspace=function(req, res)
{
	res.render('memberspace', {title:"Member Advertise",doc:"0"});
}

// This routes use for controll on the add new advertising view 
exports.memberspaceAdd = function(req, res, key)
{

	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);

	var titre=req.body.txttitre;
	var url=req.body.txturl;
	var file1=req.body.f1;
	var file2=req.body.f2;
	var file3=req.body.f3;
	var file4=req.body.f4;
	var file5=req.body.f5;

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
		console.log("MyId:");
		var objectId = new ObjectId();
		console.log(objectId);
		//con.pub.save({"content":[file1,file2,file3,file4,file5]});


		console.log("Start Sending...");

		con.coll.update({_id:ObjectId(id)},{$push:{"pubtype":{
			"pubid":objectId,
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
					console.log("You get error while uploading...!");
					console.log(error);
				}else
				{
					console.log("You get success while uploading...!");
					res.redirect('/memberspace');
				}
			}
		);


		}
	}

exports.myquizz=function(req, res,key)
{
	//res.render('myquizz',{title:"Quizz", doc:"0"});
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		con.coll.find({_id:ObjectId(id)}).toArray(function(err, clientDocs) {
			if(err)
			{
				console.log("Retrieve Error");
				console.log(err);
			}else
			{
				console.log("++++++++++++++++++++++");
				console.log(clientDocs);
				console.log("clientDocs");
				console.log(clientDocs[0].quizz);
				console.log("Quizz Length:"+clientDocs[0].quizz.quizztitle)
				
				var uniqueList = _.uniq(clientDocs[0].quizz, function(item, key, quizztitle) { 
				    return item.quizztitle;
				});
				console.log("Quizz title uniquelist :")
				console.log(uniqueList);

				res.render('myquizz', {title:"Quizz",doc:uniqueList});
			}
			
		})
	}
}

/*+++++++++++++++++++++++++++++ Delete Update Quizz ++++++++++++++++++++++++*/

exports.myquizzDelUp=function(req,res,key)
{
	console.log("Quizz Advertise Click delete and Update!");
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	var arr=req.body.chkcheck;	
	console.log("PUbID:"+arr);
	console.log("Length:"+arr.length);
	//PubClient(id)

	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		if(req.body.btnedit=="EDIT")
		{
			if(_underscore.isArray(arr)){
				console.log("You can't update this field");
				res.redirect('/myquizz');
			}else if(arr==0 || arr==null || arr=="")
			{
				console.log("Starting Update!");
				res.redirect('/myquizz');
				//con.coll.update({_id:ObjectId(id)},{})
			}
			else
			{
				console.log("no array");
				res.render('editQuizz',{quizzid:arr});
			}

		}else
		{
			if(_underscore.isArray(arr)){
				console.log("con 1 start ");
				
				for(var i=0;i<arr.length;i++)
				{
					con.coll.update({_id:ObjectId(id)},{$pull:{"quizz":{"quizzid":ObjectId(arr[i])}}},function(error,result){
						console.log("del id:"+arr[i]);
						if(error)
						{
							console.log("You error while deleting")
							console.log(error)
						}else
						{
							console.log(result);
						}
					});
				}

			}else{
				console.log("con 2 start");
				con.coll.update({_id:ObjectId(id)},{$pull:{"quizz":{"quizzid":ObjectId(arr)}}},function(error,result){
						console.log("del id 2:"+arr);
						if(error)
						{
							console.log("Delete not success")
							console.log(error);
						}else
						{
							console.log("Success");
							console.log(result)
						}
				});
			}
				res.redirect('/myquizz');
			}
	 	}
}




exports.newquizz=function(req, res)
{
	//res.redirect('newquizz',{number:num});
	console.log("Start new Quizz")
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
	res.render('newquizz',{title:"Add New Quizz", doc:"0", number:num})
}


exports.AddnewQuizz=function(req,res,key)
{
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);

	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	var title=req.body.txttitle;
	var content=req.body;
	console.log("Contents Views:");
	console.log(content);
	
	

	var q1=req.body.txtq;
	

	var ans1=[content.txtanswer1[0],content.txtanswer2[0],content.txtanswer3[0],content.txtanswer4[0]];
	var ans2=[content.txtanswer1[1],content.txtanswer2[1],content.txtanswer3[1],content.txtanswer4[1]];
	var ans3=[content.txtanswer1[2],content.txtanswer2[2],content.txtanswer3[2],content.txtanswer4[2]];
	var ans4=[content.txtanswer1[3],content.txtanswer2[3],content.txtanswer3[3],content.txtanswer4[3]];
	var ans5=[content.txtanswer1[4],content.txtanswer2[4],content.txtanswer3[4],content.txtanswer4[4]];
	var ans6=[content.txtanswer1[5],content.txtanswer2[5],content.txtanswer3[5],content.txtanswer4[5]];

	var MainAnser=[ans1,ans2,ans3,ans4,ans5,ans6];

	console.log(ans1);

		if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{
		console.log("MyId:");
		var objectId = new ObjectId();
		console.log(objectId);
		//con.pub.save({"content":[file1,file2,file3,file4,file5]});
		console.log("Start Sending...");

		if(_underscore.isArray(content.txtq))
		{
			var objectId = new ObjectId();
			console.log("It's Array");
			
			for(var i=0;i<content.txtq.length;i++)
		    {
		    	
		    	var ObjectIdanswer=new ObjectId();
		    	console.log("ObjectId Answers:"+ObjectIdanswer);
				con.coll.update({_id:ObjectId(id)},{$push:{"quizz":{
					"quizzid": objectId,
		            "quizztitle": title,
		            "question":
			            [
			            	{
				            	"questionid":ObjectIdanswer,
				            	"quizz":content.txtq[i],
				            	"answer":MainAnser[i]
			            	}
				        ]
			        

					},
					
				},},
					function(error){
						if(error){
							console.log("You get error while uploading...!");
							console.log(error);
						}else
						{
							console.log("You get success while uploading...!");
							
						}
					}
				);
			}
			res.redirect('/myquizz');
		}else{
			
			var objectId = new ObjectId();
			var ObjectIdanswer=new ObjectId();
			console.log("It's not an Array");
			con.coll.update({_id:ObjectId(id)},{$push:{"quizz":{
				"quizzid": objectId,
	            "quizztitle": title,
	            "question":
				            {
				            	"questionid":ObjectIdanswer,
				            	"quizz":content.txtq,
				            	"answer":[
				            		content.txtanswer1,
				            		content.txtanswer2,
				            		content.txtanswer3,
				            		content.txtanswer4
				            	]
				            }

				},
				
			},},
				function(error){
					if(error){
						console.log("You get error while uploading...!");
						console.log(error);
					}else
					{
						console.log("You get success while uploading...!");
						res.redirect('/myquizz');
					}
				}
			);
		}



	}
}


/*++++++++++++++++++++++++++ Get the number of select dropbox +++++++++++*/
exports.AddnewQuizzNumber=function(req,res)
{
	console.log("Add New number Quizz !");

	var num = req.param('num');

	res.redirect('newquizz',{number:num});		
		
}

exports.Challengiz=function(req,res)
{
	res.render("challengiz",{title:"Challengiz"});
}



exports.EditQuizz=function(req,res)
{
	res.render("editQuizz",{title:"Edit Quizz"});
}

/*++++++++++++++++++++++ Update Quizz +++++++++++++++++++++*/
exports.EditQuizzPost=function(req,res,key)
{
	console.log("Quizz Advertise Click delete and Update 2!");
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	var arr=req.body.chkcheck;	
	var quizzid=req.body.txtid;
	console.log("Quizz ID:"+quizzid);

	var objectId = new ObjectId();
	var ObjectIdanswer=new ObjectId();

	var title=req.body.txttitle;
	var q1=req.body.txtq;
	var ans1=req.body.txtanswer1;
	var ans2=req.body.txtanswer2;
	var ans3=req.body.txtanswer3;
	var ans4=req.body.txtanswer4;
	
	console.log(title)
	console.log(q1)
	console.log(ans1)
	console.log(ans2)
	console.log(ans3)
	console.log(ans4)

	con.coll.update({_id:ObjectId(id)},{$pull:{"quizz":{"quizzid":ObjectId(quizzid)}}},function(error,result){
		if(error)
		{
			console.log("You get an Error while Editing...!");
			console.log(error);
		}else
		{
			con.coll.update({_id:ObjectId(id)},{$push:{"quizz":{
			"quizzid":objectId,
            "quizztitle": title,
            "question":
			            {
			            	"questionid":ObjectIdanswer,
			            	"quizz":q1,
			            	"answer":[
			            		ans1,
			            		ans2,
			            		ans3,
			            		ans4
			            	]
			            }
			},
			
		},},
			function(error){
				if(error){
					console.log("You get error while uploading...!");
					console.log(error);
				}else
				{
					console.log("You get success while uploading...!");
					res.redirect('/myquizz');
				}
			}
		);
		}
	});
	
}