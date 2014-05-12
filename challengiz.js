// mongodb://<dbuser>:<dbpassword>@ds037758.mongolab.com:37758/dbchallengiz

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

MongoClient.connect('mongodb://dbchallengiz:12345@ds037758.mongolab.com:37758/dbchallengiz?w=1', function(err, db) {
  assert.equal(null, err);
  assert.ok(db != null);

/*
  db.collection("client").update({a:1}, {b:1}, {upsert:true}, function(err, result) {
    assert.equal(null, err);
    assert.equal(1, result);
    if (err)
    {
    	console.log(err);
    }else{
    	console.log("success");
    }

    db.close();
  });

*/


var client_collection = db.collection('client').find().toArray(function(err, docs) {
    console.dir(docs);
    db.close();
})

//console.log(client_collection);

});

