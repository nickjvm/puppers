const bodyParser = require('body-parser')
const path = require('path');
const http = require('http');

const express = require('express');
const dotenv = require('dotenv')

dotenv.config({path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}.local`)})

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/pets', (req, res) => {
  return http.get(`http://api.petfinder.com/pet.find?key=${process.env.PETFINDER_API_KEY}&location=80526&format=json&animal=dog`, response => {
    let rawData = '';
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        res.send(parsedData.petfinder);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`App running on port ${PORT}`));
