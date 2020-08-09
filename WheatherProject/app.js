const myExpress = require("express");
const myHttps = require("https");
const bodyParser = require("body-parser");

const myapp = myExpress();
myapp.use(bodyParser.urlencoded({ extended: true }))


myapp.listen(3000, function(){
  console.log("server is started");
});

myapp.get("/",function(req, res){
res.sendFile(__dirname + "\\index.html");
//  res.send("server is up and runing");
});


myapp.post("/",function(req,res){
  console.log(req.body);
  const city = req.body.cityName;
  console.log(city);
  const appid = "d985c651544f1e80a1d7e86fd69531bf";
  const url = "https://samples.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+ appid;
  // get method is use to call the web request
  console.log(url);
  myHttps.get(url, function(response){
    //console.log(response);
      console.log(response.statusCode);

      //on method is use to get the data from that request
      response.on("data", function(data){
        console.log(data); // this data will be in hexaadecmial format , to see it we have to convert in the decimal
        // so for the actual ata we have to parse it.

        // it is use to pars into the JSON object
        const wheateData = JSON.parse(data);
        console.log(wheateData);

        // to comapct the json in a single line
        console.log(JSON.stringify(wheateData));

        const description = wheateData.weather[0].description;
        const temp = wheateData.main.temp;
        const imageIcon = wheateData.weather[0].icon;

        console.log(imageIcon);
        //http://openweathermap.org/img/wn/10d@2x.png
        const imagurl = "http://openweathermap.org/img/wn/" +imageIcon + "@2x.png";
        console.log(imagurl);
        console.log(temp + "  "+ description);
          res.write("<h1>Temp in "+city +" is "  +temp +"</h1>" );
          res.write("Decrpition is " + description);
          res.write("<br>");
          res.write("<img src=" + imagurl + ">");
          res.send();
      });


  });

//  res.send(res.data);
});
