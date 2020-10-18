//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection to URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

//Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err){
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    
    // insert DOcuments of 3 fruits below, and then close the connection to database
    // insertDocuments(db, function(){
    //     client.close();
    // })

    // Find the documents
    findDocuments(db, function(){
        client.close();
    });
});



const insertDocuments = function(db, callback){
    // Get the document collection, with location - db.collection.insertMany
    const collection = db.collection('fruits');
    // insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        }, 
        {
            name: "Orange",
            score: 6,
            review: "Kinda Sour"
        },  
        {
            name: "Banana",
            score: 9,
            review: "Healthy Stuff"
        }
    ], function(err, result){
        // these is to ensure no errors
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collections");
        callback(result);
    }
    );
}

const findDocuments = function(db, callback){
    const collection = db.collection('fruits');
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
}