const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('KTL Backend is running!');
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is healthy and running on port ' + port });
});

app.listen(port, () => {
  console.log(`KTL Backend listening at http://localhost:${port}`);
});

