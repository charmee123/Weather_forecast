const express = require("express");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  // res.sendFile(__dirname + "/index.html");
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/style.css"));
  
})



app.post("/", function(req, res) {
  const query = req.body.CityName;
  const apiKey = "06f887d390672440e1a79483d9babb5a";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/otherCity.html");

    }
    response.on("data", function(data) {

      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const discript = weatherdata.weather[0].description
      const humidity = weatherdata.main.humidity
      const windSpeed = weatherdata.wind.speed
      const icon = weatherdata.weather[0].icon
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + discript + " </p>")
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>");
      res.write("<h2>The humidity in " + query + " is " + humidity + "%.</h2>")
      res.write("<h2>The wind flows at the speed of " + windSpeed + "km/hour.</h2>")
      res.write("<img src=" + imgUrl + ">");
      res.send();

    })
  })
});

app.post("/", function(req, res) {
  res.redirect("/");
});

app.listen(300, function() {
  console.log("Server is running at port 300");
});
