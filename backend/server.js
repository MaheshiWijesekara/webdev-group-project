const jwt = require('jsonwebtoken');
const SECRET_KEY = "virelle_secret_key"; 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
// Added urlencoded for handling FormData properly
app.use(express.urlencoded({ extended: true }));

// --- MULTER SETUP ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Renaming to avoid name conflicts
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

// Make the 'uploads' folder public
app.use('/uploads', express.static('uploads'));

// --- DATABASE CONNECTION ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: 'amti@1362', 
    database: 'virelle_db'
});

db.connect(err => {
    if (err) {
        console.error("Database Connection Failed!:", err.message);
    } else {
        console.log("MySQL Connected...");
    }
});

// --- ROUTES ---

// 1. Get all products
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. User Registration
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error during registration" });
    }
});

// 3. User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });
        
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name } });
    });
});

// 4. Cart Add (Hybrid: Save to DB)
app.post('/api/cart/add', (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    // This SQL checks if the product is already in the user's cart
    const checkSql = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
    
    db.query(checkSql, [userId, productId], (err, results) => {
        if (results.length > 0) {
            // If it exists, UPDATE the quantity
            const updateSql = "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
            db.query(updateSql, [quantity, userId, productId], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Quantity updated" });
            });
        } else {
            // If it doesn't exist, INSERT new row
            const insertSql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
            db.query(insertSql, [userId, productId, quantity], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Added to cart" });
            });
        }
    });
});

// 5. Get all blogs
app.get('/api/blogs', (req, res) => {
    const sql = "SELECT * FROM blogs ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 6. Post a new blog (WITH IMAGE UPLOAD)
app.post('/api/blogs', upload.single('image'), (req, res) => {
    const { name, title, author } = req.body;
    const date = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    // Path to be saved in the database
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if essential fields are missing
    if (!name || !title) {
        return res.status(400).json({ error: "Headline and Category are required" });
    }

    const sql = "INSERT INTO blogs (name, title, image, author, date) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [name, title, imagePath, author, date], (err, result) => {
        if (err) {
            // This logs the SPECIFIC SQL error to your terminal window
            console.error("SQL INSERT ERROR:", err); 
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.status(201).json({ message: "Blog posted successfully!" });
    });
});

// 1. Place Order Route
app.post('/api/orders', (req, res) => {
    const { userId, email, total } = req.body;
    const sql = "INSERT INTO orders (user_id, customer_email, total_amount) VALUES (?, ?, ?)";
    db.query(sql, [userId, email, total], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Order stored!" });
    });
});

// 2. Clear Cart Route (When order is finished)
app.delete('/api/cart/clear/:userId', (req, res) => {
    const sql = "DELETE FROM cart WHERE user_id = ?";
    db.query(sql, [req.params.userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cart cleared" });
    });
});

app.get('/api/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    // We use a JOIN to get the product details along with the cart quantity
    const sql = `
        SELECT products.*, cart.quantity 
        FROM cart 
        JOIN products ON cart.product_id = products.id 
        WHERE cart.user_id = ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));