const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3001;

const path = require('path');

require('dotenv').config();

app.use(cors());
app.use(express.json());

// // Initialize SQLite Database
// const db = new sqlite3.Database(':memory:');

// Path to the SQLite database in the 'database' folder
const dbPath = path.resolve(__dirname, process.env.DB_PATH);

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating posts table:', err.message);
      } else {
        console.log('Posts table created or already exists.');
      }
    });
  });
  
// Get all posts
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM Posts', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get post by id
app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM Posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Create new post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }
  
    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ post: { id: this.lastID, title, content } });
    });
  });
  
// Delete post
app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM Posts WHERE id = ?', id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
});

app.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    // Validate input
    if (!title && !content) {
      return res.status(400).json({ error: 'Title or content is required for updating' });
    }
  
    // Construct the SQL query
    let updateQuery = 'UPDATE posts SET ';
    let params = [];
    
    if (title) {
      updateQuery += 'title = ?';
      params.push(title);
    }
    if (content) {
      if (params.length > 0) updateQuery += ', ';
      updateQuery += 'content = ?';
      params.push(content);
    }
  
    updateQuery += ' WHERE id = ?';
    params.push(id);
  
    // Execute the SQL query
    db.run(updateQuery, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (this.changes === 0) {
        // No rows were updated
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({ message: 'Post updated successfully' });
    });
  });
  
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
