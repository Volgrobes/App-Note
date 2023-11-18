const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

// Create a SQLite database connection
const db = new sqlite3.Database("mydatabase.db");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT)"
  );
});

//middlewares
// Serve static files, including JavaScript files
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(bodyParser.json());

// HTML routes

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "../frontend/pages/index.html");
  res.sendFile(indexPath);
});

// CRUD routes

// Read All
app.get("/api/notes", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create
app.post("/api/notes", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";
  db.run(sql, [title, content], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Note created successfully" });
  });
});
