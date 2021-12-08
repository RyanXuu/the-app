const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'TheAppDB',
});

app.get("/", (req, res) => {
  const sqlInsert = "INSERT INTO tasks (task, description) VALUES ('walk the dog', 'walk him a supar far');"

  db.query(sqlInsert, (err, result) => {
    res.send("hello u");
  });
  
});

app.listen(3001, () => {
  console.log('running on port 3001');
});