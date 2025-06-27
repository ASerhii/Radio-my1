// server.js
const express = require('express');
const request = require('request');

const app = express();

const stations = {
  ibiza: 'http://air.radiorecord.ru:805/ibiza_320',
  goa: 'http://air.radiorecord.ru:805/goa_320',
  trance: 'http://air.radiorecord.ru:805/trance_320'
};

app.get('/:station', (req, res) => {
  const url = stations[req.params.station];
  if (!url) return res.status(404).send('Станція не знайдена 😢');
  res.setHeader('Content-Type', 'audio/mpeg');
  req.pipe(request(url)).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Радіо-проксі на порту ${PORT}`);
});
