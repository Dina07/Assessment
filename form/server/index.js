const express = require('express');
const bodyParser = require("body-parser")
const mysql = require('mysql');

const app = express();
const PORT = 5000;
var jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({
  extended: true
}));
// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'assessment'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

app.get('/get/method', (req, res) => {
  res.json({message: "Assessment!"});
});
// API endpoint to save form data
app.post('/user/form', jsonParser, function (req, res) {
  console.log("req: ", req.body)
  // console.log("res: ", res)
  const {name, email, firstName, number, age} = req.body;

  const sql = 'INSERT INTO users (name, email,firstName,number,age) VALUES (?, ?,?,?,?)';
  const values = [name, email, firstName, number, age];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving form:', err);
      res.status(500).json({error: 'Failed to submit form.'});
    } else {
      res.status(200).json({message: 'Form submitted successfully!'});
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
