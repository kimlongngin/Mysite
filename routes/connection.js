/*
	+++++++++++++++++++++ 2014-05-13 ++++++++++++++++++
	This route use for connection to our view 
*/

var mongodb = require('mongodb');
var MONGODB_URI = 'mongodb://dbchallengiz:12345@ds037758.mongolab.com:37758/dbchallengiz?w=1';
var db;
var coll;
var sas_origin_coll;
var giftcoll;
var pub;
var calendarcoll;
var gift_descoll;
var challengecoll;
// Initialize connection once

exports.colls=function(){

	mongodb.MongoClient.connect(MONGODB_URI, function(err, database) {
	  if(err) throw err;
	  db = database;
	  exports.coll = db.collection('client'); 
	  exports.sas_origin_coll = db.collection('sas_origines');
	  exports.giftcoll=db.collection('gift');
	  exports.pubcoll=db.collection('pub');
	  exports.calendarcoll=db.collection('calendar');
	  exports.gift_descoll=db.collection('gift_description');
	  exports.challengecoll=db.collection('challenge');
	  console.log('connected');

	})
}



/*exports.coll=coll;
exports.sas_origin_coll=sas_origin_coll;
exports.giftcoll=giftcoll;*/