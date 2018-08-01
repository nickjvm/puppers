const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var Geocodio = require("geocodio");

dotenv.config({
  path: path.join(
    __dirname,
    `.env.${process.env.NODE_ENV || "development"}.local`
  )
});

const app = express();

var geocodio = new Geocodio({ api_key: process.env.GEOCODIO_API_KEY });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.post("/geo", function(req, res) {
  geocodio.get("reverse", { q: `${req.body.lat},${req.body.long}` }, function(
    err,
    response
  ) {
    if (err) throw err;
    return res.json({
      zip: JSON.parse(response).results[0].address_components.zip
    });
  });
});

app.get("/pets", function(req, res) {
  return http.get(
    `http://api.petfinder.com/pet.find?count=24&format=json&location=${
      req.query.location
    }&animal=dog&key=${process.env.PETFINDER_API_KEY}`,
    response => {
      let rawData = "";
      response.on("data", chunk => {
        rawData += chunk;
      });
      response.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          res.send(parsedData.petfinder);
        } catch (e) {
          console.log(e.message);
        }
      });
    }
  );
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`);
});
