const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cors());         // To allow React to talk to Express

// 1. Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '', 
    database: 'virelle_db'
});

db.connect(err => {
    if (err) console.error('Database connection failed:', err);
    else console.log('Connected to MySQL Database');
});

// 2. Signup Route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send({ message: "Email already exists" });
                }
                return res.status(500).send(err);
            }
            res.status(201).send({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).send({ message: "Error hashing password" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));