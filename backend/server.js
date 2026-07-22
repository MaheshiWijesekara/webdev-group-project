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
    password: '', 
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

app.get('/api/products', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const category = req.query.category || 'all';
    const availability = req.query.availability || 'all';
    const sortBy = req.query.sortBy || 'default';
    
    const limit = 8;
    const offset = (page - 1) * limit;

    // 1. Build Dynamic SQL Query
    let query = "FROM products WHERE pname LIKE ?";
    let params = [`%${search}%`];

    if (category !== 'all') {
        query += " AND category = ?";
        params.push(category);
    }
    if (availability !== 'all') {
        query += " AND availability = ?";
        params.push(availability);
    }

    // 2. Handle Sorting
    let sortSql = "";
    if (sortBy === 'New') sortSql = " ORDER BY id DESC";
    else if (sortBy === 'Sale') sortSql = " AND tag = 'Sale'";

    // 3. Final Queries
    const dataSql = "SELECT * " + query + sortSql + " LIMIT ? OFFSET ?";
    const countSql = "SELECT COUNT(*) as total " + query;

    db.query(dataSql, [...params, limit, offset], (err, products) => {
        if (err) return res.status(500).json(err);

        db.query(countSql, params, (err, countResult) => {
            if (err) return res.status(500).json(err);

            const totalProducts = countResult[0].total;
            const totalPages = Math.ceil(totalProducts / limit);

            res.json({
                products: products,
                totalPages: totalPages,
                currentPage: page
            });
        });
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

app.get('/api/products/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]); // Send only the first result (the specific product)
    });
});
// 1. GET reviews
app.get('/api/reviews/:productId', (req, res) => {
    // Changed table name to product_reviews
    const sql = `
        SELECT product_reviews.*, users.name as user_name 
        FROM product_reviews 
        JOIN users ON product_reviews.user_id = users.id 
        WHERE product_reviews.product_id = ? 
        ORDER BY product_reviews.review_date DESC`;

    db.query(sql, [req.params.productId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. POST review
app.post('/api/reviews', (req, res) => {
    const { userId, productId, comment, rating } = req.body;
    // Changed table name to product_reviews
    const sql = "INSERT INTO product_reviews (user_id, product_id, comment, rating) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [userId, productId, comment, rating], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json(err);
        }
        res.status(201).json({ message: "Review added!" });
    });
});

// 3. DELETE a review (To prove you can handle the 'D' in CRUD)
app.delete('/api/reviews/:id', (req, res) => {
    // Changed table name to product_reviews
    const sql = "DELETE FROM product_reviews WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Review deleted" });
    });
});

// 1. Get Order History for a specific user
app.get('/api/orders/:userId', (req, res) => {
    const sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC";
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. Update User Profile Name
app.put('/api/user/update', (req, res) => {
    const { id, name } = req.body;
    db.query("UPDATE users SET name = ? WHERE id = ?", [name, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Profile updated successfully!" });
    });
});

// 3. Update Password (Security)
app.put('/api/user/password', async (req, res) => {
    const { id, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Password changed!" });
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));