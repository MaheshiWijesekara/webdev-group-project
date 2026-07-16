const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: 'amti@1362', // Your MySQL password
    database: 'virelle_db'
});

db.connect(err => {
    if (err) console.log("Database Connection Failed!", err);
    else console.log("MySQL Connected...");
});

app.listen(5000, () => console.log("Server running on port 5000"));

// This route gets all products from the database
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM products";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Database error" });
        }
        // Send the database rows back to the frontend as JSON
        res.json(results);
    });
});