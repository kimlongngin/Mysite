
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



exports.calendarPlan=function(req,res,key)
{



	console.log("Post Click");
	var datetime=new Date();
	console.log("New Date:"+datetime);
	var year =datetime.getFullYear();
	var month=(datetime.getMonth()+1);
	var day=datetime.getDate();
	var arrmonth=[];
	var arrtime=[];

	


	var fullDateSearch="";
	if(month<10)
	{
		month="0"+(datetime.getMonth()+1)
		console.log("The Mongth:"+month);
	}
	fullDateSearch=year+"-"+month+"-"+day
	console.log(fullDateSearch);	

	/*var optyear=req.body.optyear;
	var optmonth=req.body.optmonth;*/


	con.calendarcoll.find({},{challenge_date:true}).sort({challenge_date:1}).toArray(function(err,docyear){
			
		console.log("Before Unig");
		console.log(docyear);
	
		console.log("after Uniq");
		var mydoc = _underscore.uniq(docyear, function(item) { return item.challenge_date.getFullYear(); });
		console.log(mydoc)
		
		if(err)
		{		
			console.log("You get an error while retrieving data");
		}else{
			
			var myarr=[];

			console.log("success!");

			con.calendarcoll.find({"challenge_date":new Date(fullDateSearch)}).toArray(function(err,result){
				console.log("Calendar Result:");
					console.log(result);
					console.log(result[0].challenge_date.getFullYear()+"-"+result[0].challenge_date.getDate()+"-"+result[0].challenge_date.getMonth()+"-"+result[0].challenge_date.getHours()+"-"+result[0].challenge_date.getMinutes());
					console.log(result.length);

					/* ++++++++++++++ Store month as object key ++++++++++++++++*/
						
						var obj=new Array();
						for(var i=0;i<result.length;i++)
						{	
							var strDate=(result[i].challenge_date.getMonth()+1);
							console.log("Date:"+strDate);

							if (typeof obj[strDate] == "undefined" || typeof obj[strDate]=="" ) {
								obj[strDate] = [];
							}
							obj[strDate].push([result[i].challenge_time,result[i].price]);
						}

						console.log("Object Array value:");
						console.log(obj);

						var myarrMonth=_underscore.uniq(arrmonth,function(items){
							return	items;
						});
						console.log(myarrMonth)

	
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

				if(err)
				{
					console.log("You get error while retrieve data from calendar table");
					console.log(err);
					res.send('<h1>Plese try again</h1><a href="/calendarPlan">Back</a>');
				}else
				{
					res.render('calendarPlan',{title:"Calendar",calendar:result,yeardoc:mydoc,myhour:arrtime});
				}

			});
		}
	})
}




exports.calendarPlanPost=function(req,res){

	console.log("Post Click");

	var year =req.body.optyear;
	var month=req.body.optmonth;
	var week=req.body.optweek;

	console.log("Year:"+year+",Month:"+month+",Week:"+week);
	var arrmonth=[];
	var arrtime=[];

	


	/*var fullDateSearch="";
	if(month<10)
	{
		month="0"+(datetime.getMonth()+1)
		console.log("The Mongth:"+month);
	}
	fullDateSearch=year+"-"+month+"-"+day
	console.log(fullDateSearch);*/	

	/*var optyear=req.body.optyear;
	var optmonth=req.body.optmonth;*/


	con.calendarcoll.find({},{challenge_date:true}).sort({challenge_date:1}).toArray(function(err,docyear){
			
		console.log("Before Unig");
		console.log(docyear);
	
		console.log("after Uniq");
		var mydoc = _underscore.uniq(docyear, function(item) { return item.challenge_date.getFullYear(); });
		console.log(mydoc)
		
		if(err)
		{		
			console.log("You get an error while retrieving data");
		}else{
			
			var myarr=[];

			console.log("success!");

			con.calendarcoll.find({"year":year,"month":month,"week":week}).sort({month:-1}).toArray(function(err,result){
				console.log("Calendar Result:");
					console.log(result);
					//console.log(result[0].challenge_date.getFullYear()+"-"+result[0].challenge_date.getDate()+"-"+result[0].challenge_date.getMonth()+"-"+result[0].challenge_date.getHours()+"-"+result[0].challenge_date.getMinutes());
					console.log(result.length);

					/* ++++++++++++++ Store month as object key ++++++++++++++++*/
						
						var obj=new Array();
						for(var i=0;i<result.length;i++)
						{	
							var strDate=(result[i].challenge_date.getMonth()+1);
							console.log("Date:"+strDate);

							if (typeof obj[strDate] == "undefined" || typeof obj[strDate]=="" ) {
								obj[strDate] = [];
							}
							obj[strDate].push([result[i].challenge_time,result[i].price]);
						}

						console.log("Object Array value:");
						console.log(obj);

						var myarrMonth=_underscore.uniq(arrmonth,function(items){
							return	items;
						});
						console.log(myarrMonth)

	
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

				if(err)
				{
					console.log("You get error while retrieve data from calendar table");
					console.log(err);
					res.send('<h1>Plese try again</h1><a href="/calendarPlan">Back</a>');
				}else
				{
					res.render('calendarPlan',{title:"Calendar",calendar:result,yeardoc:mydoc,myhour:arrtime});
				}

			});
		}
	})

}