const normalizer = require('./src/helpers/normalizer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http');
const dotenv = require('dotenv');
var cors = require('cors');

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

dotenv.config({path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}.local`)})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/pets', function (req, res) {
 return http.get(`http://api.petfinder.com/pet.find?format=json&location=${req.query.location}&animal=dog&key=${process.env.PETFINDER_API_KEY}`, response => {
     let rawData = ''
     response.on('data', (chunk) => {
         rawData += chunk;
     });
     response.on('end', () =>{
         try {
         const parsedData = JSON.parse(rawData)
         res.send(normalizer(parsedData.petfinder));
         } catch(e) {
             console.log(e.message);

         }
     })
 });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {console.log("Success!!")});
