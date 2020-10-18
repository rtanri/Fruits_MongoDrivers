//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

// 1. Create a new Schema, foundation of all data added
const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String,
});

// 2. Create model based on the Schema
const Fruit =  mongoose.model("Fruit", fruitSchema);

// 3. Create new fruit with values
const fruit = new Fruit({
    name:"Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});


// 4. to save 'fruit' in 'Fruit' collection in fruitsDB
// fruit.save();

// 1. Set the Schema to alert/prevent errors
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
});

// 2. Create model based on the Schema
const Person = mongoose.model("Person", personSchema);

// 3. Create new person with couple of values
const person = new Person({
    name:"Angela",
    age: 18,
});

// 4. Save in db
person.save();


const kiwi = new Fruit({
    name:"Kiwi",
    rating: 10,
    review: "The Best Fruit"
});

const banana = new Fruit({
    name:"Banana",
    rating: 7,
    review: "Great Energy Booster"
});

const orange = new Fruit({
    name:"Orange",
    rating: 4,
    review: "Very Sour!"
});

Fruit.insertMany([kiwi, orange, banana], function(err){
    if (err){
        console.log(err);
    } else {
        console.log("Successfully saved all fruits in fruitsDB")
    }
})

const findDocuments = function(db, callback){
    const collection = db.collection('fruits');
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
}