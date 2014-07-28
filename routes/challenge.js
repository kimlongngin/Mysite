
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

		con.gift_descoll.find().toArray(function(err,result){
			if(err){
				console.log("Error")
				console.log(err)
			}else{
				console.log("Result");
				console.log(result);

				con.calendarcoll.find().sort({challenge_time:1,challenge_date:1}).limit(13).toArray(function(err,calendarResult){
					
					if(err)
					{
						console.log("You get an error while retrieving data");
						console.log(err);
						//res.send("<form></form>")
					}else{
						console.log("Calendar Result");
						console.log(calendarResult);
						res.render('challengPhoto',{title:"Challeng Photo",number:num,data:result,calendar:calendarResult});
					}

				})

				
			}
			
		});
				
	}
}

/*++++++++++++++++++++++ Function for update is_available in calendar table ++++++++++++++++*/
app.UpdateCalendar=function(txtid)
{
	var objectId=new ObjectId(); 
	con.calendarcoll.update({_id:objectId(txtid)},{"is_available":1},function(err,sucess){
		if(err)
		{
			console.log("You error while updae is_available in calendar table");
			console.log(err);
		}else{
			console.log("Update is_available calendar was successfully!");
		}
	});
}


exports.ChallengePhotoPost=function(req,res,key)
{
	console.log("Challeng Photo is executing...");
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);
	
	var txttitle=req.body.txttitle;
	var txtquestion=req.body.txtquestion;
	var txtvalidDate=req.body.txtvalidDate;
	
	var optgift1=req.body.optgift1;
	var txtgift1=req.body.txtgift1;

	var txtvalue=req.body.txtvalue;
	var f4=req.body.img1;
	var optgift2=req.body.optgift2;
	var optphotsociety=req.body.optphotsociety;
	var txtdescrption=req.body.txtdescrption;


	var content=req.body;
	var chvalue=[[req.body.chvalue0],[req.body.chvalue1],[req.body.chvalue2],[req.body.chvalue3],[req.body.chvalue4],[req.body.chvalue5]];
	var mainArr=[];



	console.log("ChValue :");
	console.log(chvalue);
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
	console.log(txtdescrption);
	console.log(req.body);
	var j=0;
	var diff=[];
	var mainDiff=[];

			if(_underscore.isArray(content.txttitle))
			{
				for(var n=0;n<content.txttitle.length-1;n++){
					for(var j=n+1;j<content.txttitle.length;j++)
					{
						diff=_underscore.difference(chvalue[n], chvalue[j]);
						console.log("Some permission:");
						console.log(diff);

						if(diff.length<chvalue[n].length)
						{
							res.send("<h1>duplicate calendar checked, Please change</h1><a href=/challengPhoto>Try again</a>")
							break;
						}else{
							goto start;
						}
					}
				}
			}else{


				//else if (n>=content.txttitle.length-2) {}
				//console.log(diff);

				start:
					if(id=="" || id==0){
						console.log("Please login!");                                                            
					}else{
						if(req.body.btnsave=="Save")
						{	
							//res.redirect('ChallengePhoto');
							console.log("Save Was Click");
							if(_underscore.isArray(content.txttitle))
							{

								for(var i=0;i<content.txttitle.length;i++)
								{
									console.log("Date Value:");
									console.log(chvalue[i]);

									var objectId=new ObjectId();
									console.log("You put data as array!");
									con.challengecoll.save({_id:objectId,type:"photo",client_id:id,title:txttitle[i],
									question:txtquestion[i],gift1:optgift1[i],gift2:optgift2[i],Advertising:optphotsociety[i],
									calendar_id:chvalue[i],description:txtdescrption[i],created_date:new Date()					
									},function(err){
										if(err)
										{
											console.log("You get error while insert new challengiz");
											console.log(err);
										}else
										{
											


										/*+++++++++++++++++ Update the calendar ++++++++++++++++++++*/
										for(var k=0;k<chvalue[i].length;k++)
										{
											console.log("Update calendar Array")

											con.calendarcoll.update({_id:objectId(chvalue[k])},{$set:{"is_available":1}},function(err,sucess){
												if(err)
												{
													console.log("You error while updae is_available in calendar table");
													console.log(err);
												}else{
													console.log("Update is_available calendar was successfully!");
												}
											});
										}




											console.log("You get success while insert new challengiz");
										}
									});
								}
								res.redirect('/challengPhoto');


							}else{
								console.log("You put data as Object!");

								con.challengecoll.insert({_id:objectId,type:"photo",client_id:id,title:txttitle,
									question:txtquestion,gift1:optgift1,gift2:optgift2,Advertising:optphotsociety,
									calendar_id:chvalue[0],description:txtdescrption,created_date:new Date()				
								},function(err){
									if(err)
									{
										console.log("You get error while insert new challengiz");
										console.log(err);
									}else
									{
										console.log("You get success while insert new challengiz");
										
										
										/*+++++++++++++++++++++ Update the calendar +++++++++++++++++++++*/
										for(var k=0;k<req.body.chvalue0.length;k++)
										{
											//var obj=new ObjectId(); 
											console.log("Updating calendar Values:");
											con.calendarcoll.update({_id:ObjectId(req.body.chvalue0[k])},{$set:{"is_available":1}},function(err,sucess){
												if(err)
												{
													console.log("You error while updae is_available in calendar table");
													console.log(err);
												}else{
													console.log("Update is_available calendar was successfully!");
												}
											});
										}
									
										res.redirect('/challengPhoto');
									}

								});
							}
						}else if(req.body.btncancel=="Cancel")
						{
							console.log("Cancel button was clicked");
						}else
						{
							console.log("Pay was clicked");
						}
					}
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

		con.gift_descoll.find().toArray(function(err,result){
			if(err){
				console.log("Error")
				console.log(err)
			}else{
				console.log("Result");
				//console.log(result);

				con.calendarcoll.find().sort({challenge_time:1,challenge_date:1}).limit(13).toArray(function(err,calendarResult){
					if(err)
					{
						console.log("You get an error while retrieving data");
						console.log(err);
						//res.send("<form></form>")
					}else{
						console.log("Calendar Result");
						console.log(calendarResult);
						//res.render('challengPhoto',{title:"Challeng Photo",number:num,data:result,calendar:calendarResult});
						res.render('challengeQuizz',{title:"Challeng Photo",number:num,data:result,calendar:calendarResult});
					}
				})				
			}
			
		});				
	}
}



exports.challengeQuizzPost=function(req,res,key)
{
	console.log("Challeng Photo is executing...");
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);

	
	var txttitle=req.body.txttitle;
	var txtquestion=req.body.txtquestion;
	var txtvalidDate=req.body.txtvalidDate;
	
	var optgift1=req.body.optgift1;
	var txtgift1=req.body.txtgift1;

	var txtvalue=req.body.txtvalue;
	var f4=req.body.img1;
	var optgift2=req.body.optgift2;
	var optphotsociety=req.body.optphotsociety;
	var txtdescrption=req.body.txtdescrption;
	var chvalue=[[req.body.chvalue0],[req.body.chvalue1],[req.body.chvalue2],[req.body.chvalue3],[req.body.chvalue4],[req.body.chvalue5]];
	console.log("+++++++++++++++++++Quizz+++++++++++++++++")
	console.log(chvalue);

	var content=req.body;
	console.log("++++++++++++++++++++++")

	console.log(txtdescrption);
	console.log(req.body);

	var j=0;
	var diff=[];
	var mainDiff=[];

	for(var i=0;i<content.txttitle.length-1;i++){
		for(var j=i+1;j<content.txttitle.length;j++)
		{
			diff=_underscore.difference(chvalue[i], chvalue[j]);
			//mainDiff.push(diff);
			console.log("Some permission:");
			console.log(diff)

		// ++++++++++++++++ Start check the calendar id douplicated +++++++++++++	
			if(diff.length<chvalue[i].length)
			{
				res.send("<h1>duplicate calendar checked, Please change</h1><a href=/challengeQuizz>Try again</a>")
				break;
			}else if (n>=content.txttitle.length-2) {
			
		// ++++++++++++++++ Start execute insert query to table +++++++++++++++++  
				if(id=="" || id==0){
					console.log("Please login!");                                                            
				}else{
					if(req.body.btnsave=="Save")
					{
						
						//res.redirect('ChallengePhoto');

						console.log("Save Was Click");

						if(_underscore.isArray(content.txttitle))
						{
							for(var i=0;i<content.txttitle.length;i++)
							{
								console.log("Values Of I:"+i);
								var objectId=new ObjectId();

								console.log("You put data as array!");
								con.challengecoll.save({_id:objectId,type:"quizz",client_id:id,title:txttitle[i],
									question:txtquestion[i],gift1:optgift1[i],gift2:optgift2[i],Advertising:optphotsociety[i],
									valid_date:chvalue[i],description:txtdescrption[i],created_date:new Date()
								
								},function(err){

									if(err)
									{
										console.log("You get error while insert new challengiz");
										console.log(err);
									}else
									{
										console.log("You get success while insert new challengiz");
										
									}

								});
							}
							
							res.redirect('/challengeQuizz');

						}else{
							console.log("You put data as Object!");

							con.challengecoll.insert({_id:objectId,type:"quizz",client_id:id,title:txttitle,
								question:txtquestion,gift1:optgift1,gift2:optgift2,Advertising:optphotsociety,
								valid_date:chvalue,description:txtdescrption,created_date:new Date()
							
							},function(err){

								if(err)
								{
									console.log("You get error while insert new challengiz");
									console.log(err);
								}else
								{
									console.log("You get success while insert new challengiz");
									//console.log("<html><head><script>alert(Insert sucess full);</script></head><body><h1>Duplicate calendar checked</h1></body></html>")
									res.redirect('/challengeQuizz');
								}

							});
						}



					}else if(req.body.btncancel=="Cancel")
					{
						console.log("Cancel button was clicked");
					}else
					{
						console.log("Pay was clicked");
					}

				}
			}
		
		}	
	}
	console.log("Some permission from mainDiff:");
	console.log(mainDiff);

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

		con.gift_descoll.find().toArray(function(err,result){
			if(err){
				console.log("Error")
				console.log(err)
			}else{
				console.log("Result");
				console.log(result);
				res.render('challengeGoods',{title:"Challeng Goods",number:num,data:result});
			}
			
		});
				
	}
}



exports.challengeGoodsPost=function(req,res,key)
{

	console.log("GOODS FIX!");
	console.log("Challeng Goods is executing...");
	var myid;
	var id;
	var cookies= new Cookies(req, res, key);
	myid=urlencode.decode(cookies.get('IDLogin'));
	id=myid.slice(3,27);
	console.log(myid);
	console.log("My ID:"+id);

	
	var txttitle=req.body.txttitle;
	var txtquestion=req.body.txtquestion;
	var txtvalidDate=req.body.txtvalidDate;
	
	var optgift1=req.body.optgift1;
	var txtgift1=req.body.txtgift1;

	var txtvalue=req.body.txtvalue;
	var f4=req.body.img1;
	var optgift2=req.body.optgift2;
	var optphotsociety=req.body.optphotsociety;
	var txtdescrption=req.body.txtdescrption;

	var content=req.body;
	console.log("++++++++++++++++++++++")

	console.log(txtdescrption);
	console.log(req.body);


	if(id=="" || id==0){
		console.log("Please login!");                                                            
	}else{

		if(req.body.btnsave=="Save")
		{
			
			//res.redirect('ChallengePhoto');
			console.log("Save Was Click");

			if(_underscore.isArray(content.txttitle))
			{
				for(var i=0;i<content.txttitle.length;i++)
				{
					console.log("Values Of I:"+i);
					var objectId=new ObjectId();

					console.log("You put data as array!");
					con.challengecoll.save({_id:objectId,type:"goods",client_id:id,title:txttitle[i],
						question:txtquestion[i],gift1:optgift1[i],gift2:optgift2[i],Advertising:optphotsociety[i],
						valid_date:new Date(txtvalidDate),description:txtdescrption[i],created_date:new Date()
					},function(err){
						if(err)
						{
							console.log("You get error while insert new challengiz");
							console.log(err);
						}else
						{
							console.log("You get success while insert new challengiz");
						}

					});
				}
				
				res.redirect('/challengeGoods');
				
			}else{
				console.log("You put data as Object!");

				con.challengecoll.insert({_id:objectId,type:"goods",client_id:id,title:txttitle,
					question:txtquestion,gift1:optgift1,gift2:optgift2,Advertising:optphotsociety,
					valid_date:new Date(txtvalidDate),description:txtdescrption,created_date:new Date()
				
				},function(err){

					if(err)
					{
						console.log("You get error while insert new challengiz");
						console.log(err);
					}else
					{
						console.log("You get success while insert new challengiz");
						res.redirect('/challengeGoods');
					}

				});
			}

		}else if(req.body.btncancel=="Cancel")
		{
			console.log("Cancel button was clicked");
		}else
		{
			console.log("Pay was clicked");
		}

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

exports.Calendar=function(req,res)
{
	/*con.calendarcoll.find().sort({challenge_date:1}).toArray(function(err,result){
		console.log("Calendar Result:");
		console.log(result);

		console.log("Year:"+result[0].challenge_date.getFullYear());
		console.log("Month:"+(result[0].challenge_date.getMonth()+1));
		console.log("Day:"+result[0].challenge_date.getDate());
	});
*/
	res.render('calendar',{title:"Calendar"});

}

exports.CalendarPost=function(req, res)
{
	/*var arrtime=[{
		"1":"1:00 AM"
	}];*/

	var txtdate=new Date(req.body.txtdate);
	var tmonth=(new Date(req.body.txtdate).getMonth()+1);
	console.log("T Month:"+tmonth);
	//var txttime=req.body.s2Time2;
	//var txttimestamp=txtdate+txttime;
	console.log("Date Inserting:"+txtdate);
	var txtprice=req.body.txtprice;
	var txtweek =req.body.optweek;
	var hour=req.body.opthours;
	var minute=req.body.optminutes;
	var hourminute=hour+":"+minute;
	console.log("Hours:"+hourminute);

	/*console.log(txtdate+","+txttime+","+txtprice);*/	
	
	var objectId=new ObjectId();

	if(_underscore.isNull(txtdate) || _underscore.isNull(hourminute) || _underscore.isNull(txtprice))
	{
		res.send("<h1>Some fields is Empty Please check it again</h1> <a href=calendar>Back</a>");
	}else
	{
		console.log("Start Executing!")
		con.calendarcoll.find({challenge_date:new Date(txtdate),week:txtweek,challenge_time:hourminute}).toArray(function(err,result){
			if(err)
			{
				console.log("You get an error while selecting!");
				console.log(err);
			}else
			{
				console.log("Select Calendar resule");
				console.log(result);
				if(result.length==0 || result == null || result =="" || result.length<0)
				{
					con.calendarcoll.save({_id:objectId,challenge_date:new Date(txtdate),year:(new Date(txtdate)).getFullYear(),month:tmonth,week:txtweek,challenge_time:hourminute,price:txtprice,is_available:0,created:new Date()}, function(err){
		
						if(err)
						{
							console.log("Error while insert new row");
							res.send("<h1>Error page while insert new page</h1> <a href=calendar>Back</a>");
						}else
						{
							console.log("You success with inserting...!")
							res.redirect('/calendar');
						}


					});
				}else{
					res.send("<h1>Already Existing</h1><a href=/calendar>Back</a>");
				}
			
			}
		})

		


	}


}