const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql");

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'TheAppDB',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM tasks;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  })
})
app.post("/api/insert", (req, res) => {
  const sqlInsert = "INSERT INTO tasks (task, description) VALUES (NULL, NULL);";
  db.query(sqlInsert, (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log('running on port 3001');
});