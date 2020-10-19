//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

// 1. Create a new Schema, foundation of all data added
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
         min: 1,
         max: 10
    },
    review: String,
});

// 2. Create model based on the Schema
const Fruit =  mongoose.model("Fruit", fruitSchema);

// 3. Create new fruit with values
const fruit = new Fruit({
    name: "Peach",
    rating: 4,
    review: "Peach is very nice"
});


// 4. to save 'fruit' in 'Fruit' collection in fruitsDB
// fruit.save();

// 1. Set the Schema to alert/prevent errors
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

// 2. Create model based on the Schema
const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit."
})

// pineapple.save();

const mango = new Fruit({
    name:"Mango",
    rating: 9,
    review:"Sweet and decent snacks"
})

mango.save();

Person.updateOne({name:"John"}, {favouriteFruit: mango}, function(err){
    if(err){
        console.log(err)
    } else {
        console.log("Successfully update the document.")
    }
})

// 3. Create new person with couple of values
// const person = new Person({
//     name:"Amy",
//     age: 12,
//     favouriteFruit: pineapple
// });



// 4. Save in db
// person.save();


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




// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Successfully saved all fruits in fruitsDB")
//     }
// })

// Fruit.find(function(err, fruits){
//     if(err){
//         console.log(err);
//     } else {

//         mongoose.connection.close(); //automaticly close the mongodb connection

//         fruits.forEach(function(fruit){
//             console.log(fruit.name);
//         });
//     }
// });

// updateOne({id, what_do_you_want_to_update, callback func })
// Fruit.updateOne({_id: "5f8c59462a8ada7fc5121aff"}, {name:"Watermelon"}, function (err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Succesfully update the document")
//     }
// })

// Fruit.deleteOne({name: "Orange"}, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Successfully deleted the document");
//     }
// });

// Person.deleteMany({name: "Angela"}, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Successfully deleted all the document");
//     }
// });