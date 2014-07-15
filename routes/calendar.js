
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

	var datetime=new Date();
	con.calendarcoll.find().sort({challenge_date:-1}).limit(5).toArray(function(err,result){
		console.log("Calendar Result:");
		console.log(result);

		console.log("Year:"+result[0].challenge_date.getFullYear());
		console.log("Month:"+(result[0].challenge_date.getMonth()+1).toString());
		console.log("Day:"+result[0].challenge_date.getDate().toString());
	
		if(err)
		{
			console.log("You get error while retrieve data from calendar table");
			console.lo(err);
		}else
		{
			res.render('calendarPlan',{title:"Calendar",calendar:result});
		}

	});

	
}