const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app =express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res) {
    const query = req.body.cityName;
    console.log(query);
    if (!query) {
        res.send("Enter city");
    } else {
    //HTTP request to call weather API
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" +query + "&appid=5008140f509616832f86801fd17f626a&units=metric";
    https.get(url,function(response){
        response.on("data",function (data) {
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var icon = weatherData.weather[0].icon;
            const imageUrl  = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Temperature of " + query + " </h1>");
            res.write("<p> is " + temp + " degree celcius </p>");
            res.write("<img src =" + imageUrl + ">");
            res.send();
        })
    })
}
})

app.use((req,res,next)=>{
    const error = new Error('Page Not found');
    error.status =404;
    next(error);

});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error :{
            message :error.message
        }
    })
})

app.listen(3000,function() {
    console.log("App listening on port 3000");
})