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

app.post("/api/insert", (req, res) => {
  const sqlInsert = "INSERT INTO tasks (task, description) VALUES (NULL, NULL);";
  db.query(sqlInsert, (err, result) => {
    console.log(err);
  });
});

app.get("/api/get/all", (req, res) => {
  const sqlSelect = "SELECT * FROM tasks;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  })
})

app.get("/api/get/max", (req, res) => {
  const sqlSelect = "SELECT MAX(id) FROM tasks;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  })
})

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const task = req.body.task;
  const sqlUpdate = "UPDATE tasks SET task = ? WHERE id = ?;";
  db.query(sqlUpdate, [task, id], (err, result) => {
    if (err) console.log(err);
  })

});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM tasks WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log('running on port 3001');
});