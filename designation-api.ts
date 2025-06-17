const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

app.get('/api/designations', (req, res) => {
  fs.readFile('./response_1750178124906.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data' });
    }
    // Parse and send only the "data" array as "result" for Angular compatibility
    const json = JSON.parse(data);
    res.json({ result: json.data });
  });
});

app.listen(3000, () => {
  console.log('Designation API running at http://localhost:3000/api/designations');
});