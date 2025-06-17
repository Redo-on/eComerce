import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());

app.get('/api/employees', (req, res) => {
  fs.readFile('./response_1750184825019.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading data' });
      return; // <-- Add this line
    }
    const json = JSON.parse(data);
    res.json({ result: json.data });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Employee API running at http://localhost:${PORT}/api/employees`);
});