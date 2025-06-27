const express = require('express');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Проксі маршрут
app.get('/ibiza', (req, res) => {
  const options = {
    hostname: 'air.radiorecord.ru',
    port: 805,
    path: '/ibiza_320',
    method: 'GET',
    headers: {
      'Icy-MetaData': '1',
      'User-Agent': 'Mozilla/5.0'
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

// Головна сторінка з плеєром
app.get('/', (req, res) => {
  res.send(`
    <h1>Радіо IBIZA 🎶</h1>
    <audio controls autoplay src="/ibiza"></audio>
  `);
});

app.listen(PORT, () => {
  console.log(`🔥 Ibiza proxy server running on port ${PORT}`);
});
