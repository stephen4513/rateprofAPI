const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Load and parse the JSON file once when the server starts
const professorsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'professors.json'), 'utf-8'));

app.get('/api/professor', (req, res) => {
  const { name, institution, department } = req.query;
  const filteredProfessors = professorsData.professors.filter(prof =>
    prof.name === name &&
    prof.institution === institution &&
    prof.department === department
  );

  if (filteredProfessors.length > 0) {
    res.json(filteredProfessors[0]);
  } else {
    res.status(404).json({ error: 'Professor not found' });
  }
});

app.listen(port, () => {
  console.log(`Professor rating API running at http://localhost:${port}`);
});
