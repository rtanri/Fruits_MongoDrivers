//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });



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