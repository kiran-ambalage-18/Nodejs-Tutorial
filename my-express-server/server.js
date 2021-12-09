const express = require("express");

const app = express();

app.get("/",function (req, res) {
    res.send("Hello Kiran");
});

app.get("/contact", function (req, res) {
    res.send("This is contact page");
});

app.get("/about",function(req,res) {
    res.send("This is about page");
});

app.get("/hobbies",function(req,res) {
    res.send("my hobby");
});

app.listen(3000, function () {
    console.log("App listeneing on port 3000");
})