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
  const indexCol = req.body.indexCol;
  const listId = req.body.listId;
  const sqlInsert = "INSERT INTO tasks (task, description, indexCol, listId) VALUES (NULL, NULL, ?, ?);";
  

  db.query(sqlInsert, [indexCol, listId], (err, result) => {
    console.log(err);
    res.send(result);
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

app.put("/api/update/task", (req, res) => {
  const id = req.body.id;
  const task = req.body.task;
  const sqlUpdate = "UPDATE tasks SET task = ? WHERE id = ?;";
  db.query(sqlUpdate, [task, id], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  })

});

app.put("/api/update/swapTaskIndex", (req, res) => {
  const id1 = req.body.id1;
  const index1 = req.body.index1;
  const id2 = req.body.id2;
  const index2 = req.body.index2;
  const sqlUpdate1 = "UPDATE tasks SET indexCol = ? WHERE id = ?;"
  db.query(sqlUpdate1, [index1, id2], (err, result) => {
    if (err) console.log(err);
  })
  const sqlUpdate2 = "UPDATE tasks SET indexCol = ? WHERE id = ?;"
  db.query(sqlUpdate2, [index2, id1], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  })
});

app.put("/api/update/listId", (req, res) => {
  const id = req.body.id;
  const index = req.body.index;
  const listId = req.body.listId;
  const newListId = req.body.newListId;
  const newListLength = req.body.newListLength;

  if (index > newListLength - 1) {
    const sqlUpdate1 = 
      "UPDATE tasks SET indexCol = ?, listId = ? WHERE id = ?;";
    db.query(sqlUpdate1, [newListLength, newListId, id], (err, result) => {
      if (err) console.log(err);
    })
  }

  else {
    const sqlUpdate1 =
      "UPDATE tasks SET indexCol = indexCol + 1 WHERE indexCol >= ? AND listId = ?";
    db.query(sqlUpdate1, [index, newListId], (err, result) => {
      if (err) console.log(err);
    })

    const sqlUpdate2 =
      "UPDATE tasks SET listId = ? WHERE id = ?;";
    db.query(sqlUpdate2, [newListId, id], (err, result) => {
      if (err) console.log(err);
    })    
  } 

  const sqlUpdate = "UPDATE tasks SET indexCol = indexCol - 1 WHERE indexCol > ? AND listId = ?;";
  db.query(sqlUpdate, [index, listId], (err, result) => {
    if(err) console.log(err);
    res.send(result);
  })
})

app.put("/api/update/decrementIndexes", (req, res) => {
  const index = req.body.index;
  const listId = req.body.listId;
  const sqlUpdate = "UPDATE tasks SET indexCol = indexCol - 1 WHERE indexCol > ? AND listId = ?;"
  db.query(sqlUpdate, [index, listId], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const sqlDelete = "DELETE FROM tasks WHERE id = ?;";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
    console.log("number of rows deleted = " + result.affectedRows);
    res.send(result);
  });
  
});

app.listen(3001, () => {
  console.log('running on port 3001');
});