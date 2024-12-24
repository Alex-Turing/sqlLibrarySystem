const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3001; 

app.use(cors()); 
app.use(express.json()); 

const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) 
    {
        console.error('Error opening database:', err.message);
    } 
    else 
    {
        console.log('Connected to the SQLite database.');
    }
});

db.run(
    `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT,
        year INTEGER,
        pages INTEGER
    )`,
    (err) => {
        if (err)
        {
            console.error('Error creating table:', err.message);
        } 
        else 
        {
            console.log('Books table created or already exists.');
        }
    }
);

app.get('/api/books', (req, res) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
        if (err) 
        {
            res.status(500).json({ error: err.message });
        } 
        else 
        {
            res.json(rows);
        }
    });
});

app.post('/api/books', (req, res) => {
    const { title, author, genre, year, pages } = req.body;

    if (!title || !author || !year || !pages) 
    {
        return res.status(400).json({ error: 'Title, author, year, and pages are required' });
    }

    db.run(
        `INSERT INTO books (title, author, genre, year, pages) VALUES (?, ?, ?, ?, ?)`,
        [title, author, genre, year, pages],
        function (err) {
            if (err) 
            {
                res.status(400).json({ error: err.message });
            } 
            else 
            {
                res.json({ id: this.lastID, title, author, genre, year, pages });
            }
        }
    );
});

app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    if (!Object.keys(updateFields).length) {
        return res.status(400).json({ error: 'No fields provided for update.' });
    }

    const columns = [];
    const values = [];
    for (const [key, value] of Object.entries(updateFields)) {
        if (value) {
            columns.push(`${key} = ?`);
            values.push(value);
        }
    }

    if (columns.length === 0) {
        return res.status(400).json({ error: 'No valid fields provided for update.' });
    }

    const sqlQuery = `UPDATE books SET ${columns.join(', ')} WHERE id = ?`;
    values.push(id); 

    db.run(sqlQuery, values, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Book not found' });
        } else {
            res.json({ message: 'Book updated successfully!' });
        }
    });
});

app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params; 

    db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
        if (err) 
        {
            console.error('Error deleting item:', err.message);
            res.status(500).json({ error: err.message });
        } 
        else if (this.changes === 0) 
        {
            res.status(404).json({ error: 'Item not found' });
        } 
        else 
        {
            res.json({ message: 'Item deleted successfully!' });
        }
    });
});

app.delete('/api/books', (req, res) => {
    db.all(`DELETE FROM books`, function (err, rows) {
        if (err) 
        {
            res.status(500).json({ error: err.message });
        } 
        else 
        {
            res.json({ message: `All books have been deleted. ${this.changes} rows affected.` });
        }
    });
});

app.get('/api/books/summary', function(req, res){
    console.log("Summary route hit");
    const totalBooksQuery = `SELECT COUNT(*) AS totalBooks FROM books`;
    const booksByGenreQuery = `SELECT genre, COUNT(*) AS count FROM books GROUP BY genre`;

    db.all(totalBooksQuery, [], (err, totalBooksResult) => {
        if (err) 
        {
            res.status(500).json({ error: err.message });
        } 
        
        db.all(booksByGenreQuery, [], (err, booksByGenreResult) => {
            if (err) 
            {
                res.status(500).json({ error: err.message });
            } 
            const summary = {
                totalBooks: totalBooksResult[0].totalBooks,
                booksByGenre: booksByGenreResult
            };
            res.json(summary);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
