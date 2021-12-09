const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/PersonsDB",{ useNewUrlParser:true });



const fruitschema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:Number
});


const Fruit = mongoose.model('Fruit',fruitschema);

const banana = new Fruit({
    name:"Banana",
    price:40
});

const pineapple  = new Fruit({
    name:"Pineapple",
    price:200
});

pineapple.save();
// Fruit.insertMany([banana,grape],function(err){
//     if (err) {
//         console.log(err);
//     } else{
//         console.log("Successfully inserted data");
//     }
// })

Fruit.find(function(err,fruits){
    if (err) {
        console.log(err);
    } else {
        // mongoose.connection.close();
        fruits.forEach(function(fruit){
           console.log(fruit);
        })
    }
});


const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favoriteFruit:fruitschema
});

const Person = mongoose.model("Person",personSchema);
const person = new Person({
    name:"Prashant Gaddad",
    age:19,
    favoriteFruit:pineapple
});

 person.save();

Person.find(function(err,fruits){
    if (err) {
        console.log(err);
    } else {
        console.log(fruits);
    }
});

