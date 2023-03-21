const express = require('express')
const sqlite3 = require('sqlite3')
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database('./database.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the database.');
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.send(rows);
    });
  });

app.post("/addusers", (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const email = req.body.email;

   
    db.all(`INSERT INTO users VALUES (${id},${username},${email})`, [], (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      // Log the results to the console
      res.send(rows);
    });
    
    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  });

  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const setemail = req.body.setemail;
  
    const sql = `UPDATE users SET email="${setemail}" WHERE email="${email}"`;
    db.run(sql, [name, email, id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`User with id ${id} updated`);
      res.send(`User with id ${id} updated`);
    });
  });
  
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const email = req.body.email;
    const name = req.body.name;
  
    let sql;
    let params;
  
    if (email) {
      sql = `DELETE FROM users WHERE email = ?`;
      params = [email];
    } else if (name) {
      sql = `DELETE FROM users WHERE name = ?`;
      params = [name];
    } else {
      return res.status(400).send('Please provide either email or name of the user to delete');
    }
  
    db.run(sql, params, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Deleted user ${userId}`);
      res.send(`Deleted user ${userId}`);
    });
});
  
  

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});