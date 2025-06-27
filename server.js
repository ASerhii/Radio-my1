const express = require('express');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ibiza', (req, res) => {
  const options = {
    hostname: 'air.radiorecord.ru',
    port: 805,
    path: '/ibiza_320',
    method: 'GET',
    headers: {
      'Icy-MetaData': '1',
      'User-Agent': 'Mozilla/5.0' // деякі стріми вимагають юзер-агента
    }
  };

  const streamReq = http.request(options, streamRes => {
    res.setHeader('Content-Type', 'audio/mpeg');
    streamRes.pipe(res);
  });

  streamReq.on('error', err => {
    console.error('Stream error:', err);
    res.sendStatus(500);
  });

  streamReq.end();
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Ibiza Radio</h1>
    <audio controls autoplay src="/ibiza"></audio>
  `);
});

app.listen(PORT, () => {
  console.log(`Radio proxy running on port ${PORT}`);
});

