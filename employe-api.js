const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all employees
app.get('/api/employees', (req, res) => {
  fs.readFile('./response_1750184825019.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading data' });
      return;
    }
    const json = JSON.parse(data);
    res.json({ result: json.data });
  });
});

// Get employee by ID
app.get('/api/employees/:id', (req, res) => {
  fs.readFile('./response_1750184825019.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading data' });
      return;
    }
    const json = JSON.parse(data);
    const empId = parseInt(req.params.id, 10);
    const employee = json.data.find(emp => emp.empId === empId);
    if (employee) {
      res.json({ result: employee });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });
});

// Add a new employee
app.post('/api/employees', (req, res) => {
  fs.readFile('./response_1750184825019.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading data' });
      return;
    }
    const json = JSON.parse(data);
    json.data.push(req.body);
    fs.writeFile('./response_1750184825019.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error saving data' });
        return;
      }
      res.json({ result: true });
    });
  });
});
app.put('/api/employees/:id', (req, res) => {
  fs.readFile('./response_1750184825019.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading data' });
      return;
    }
    const json = JSON.parse(data);
    const empId = parseInt(req.params.id, 10);
    const index = json.data.findIndex(emp => emp.empId === empId);
    if (index === -1) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    json.data[index] = { ...json.data[index], ...req.body };
    fs.writeFile('./response_1750184825019.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error saving data' });
        return;
      }
      res.json({ result: json.data[index] });
    });
  });
});

// Delete an employee by ID
app.delete('/api/employees/:id', (req, res) => {
  fs.readFile('./response_1750184825019.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading data' });
      return;
    }
    const json = JSON.parse(data);
    const empId = parseInt(req.params.id, 10);
    const index = json.data.findIndex(emp => emp.empId === empId);
    if (index === -1) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    json.data.splice(index, 1);
    fs.writeFile('./response_1750184825019.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error saving data' });
        return;
      }
      res.json({ result: true });
    });
  });
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Employee API running at http://localhost:${PORT}/api/employees`);
});