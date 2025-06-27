const express = require('express');
const request = require('request');

const app = express();

const stations = {
  ibiza: 'http://air.radiorecord.ru:805/ibiza_320',
  goa: 'http://air.radiorecord.ru:805/goa_320',
  trance: 'http://air.radiorecord.ru:805/trance_320'
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/:station', (req, res) => {
  const url = stations[req.params.station];
  if (!url) return res.status(404).send('Станція не знайдена 😢');

  // Встановлюємо Content-Type в залежності від потоку
  if (url.endsWith('_320')) {
    res.setHeader('Content-Type', 'audio/mpeg');
  } else {
    res.setHeader('Content-Type', 'audio/aac');
  }

  req.pipe(request(url)).pipe(res).on('error', (err) => {
    console.error('Stream error:', err);
    res.end();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Радіо-проксі на порту ${PORT}`);
});
