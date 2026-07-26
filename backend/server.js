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
app.use(express.urlencoded({ extended: true }));

// --- MULTER SETUP - File upload configuration for product and blog images ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/'); },
    filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// --- DATABASE CONNECTION ---
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});
db.connect(err => { if (err) { console.error("Database Connection Failed!:", err.message); } else { console.log("MySQL Connected..."); } });

// PRODUCT ROUTES

// GET all products with search, pagination, category, and sorting
app.get('/api/products', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const limit = parseInt(req.query.limit) || 100;
    const category = req.query.category || 'all';
    const availability = req.query.availability || 'all';
    const sortBy = req.query.sortBy || 'default';
    const offset = (page - 1) * limit;

    let query = "FROM products WHERE pname LIKE ?";
    let params = [`%${search}%`];
    if (category !== 'all') { query += " AND category = ?"; params.push(category); }
    if (availability !== 'all') { query += " AND availability = ?"; params.push(availability); }

    let sortSql = "";
    if (sortBy === 'New') sortSql = " ORDER BY id DESC";
    else if (sortBy === 'Sale') sortSql = " AND tag = 'Sale'";

    const dataSql = `SELECT * ${query} ${sortSql} LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) as total ${query}`;

    db.query(dataSql, [...params, limit, offset], (err, products) => {
        if (err) return res.status(500).json(err);
        db.query(countSql, params, (err, countResult) => {
            if (err) return res.status(500).json(err);
            const totalProducts = countResult[0].total;
            const totalPages = Math.ceil(totalProducts / limit);
            res.json({ products: products, totalPages: totalPages, currentPage: page });
        });
    });
});

// GET single product by ID (for product details page)
app.get('/api/products/:id', (req, res) => {
    db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});

// POST - Add new product with two images (main + hover)
app.post('/api/products', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'secondImage', maxCount: 1 }]), (req, res) => {
    const { pname, pdescription, price, tag, category, subcategory, rating, availability } = req.body;
    const imagePath = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
    const secondImagePath = req.files['secondImage'] ? `/uploads/${req.files['secondImage'][0].filename}` : null;
    const sql = `INSERT INTO products (image, secondImage, pname, pdescription, price, tag, category, subcategory, rating, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [imagePath, secondImagePath, pname, pdescription, price, tag, category, subcategory, rating || 5, availability || 'In'], (err, result) => {
        if (err) { console.error("Insert Error:", err); return res.status(500).json({ error: err.message }); }
        res.status(201).json({ message: "Product added successfully!" });
    });
});

// DELETE product by ID
app.delete('/api/products/:id', (req, res) => {
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product deleted" });
    });
});

// USER AUTHENTICATION ROUTES

// Register new user with hashed password
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) { res.status(500).json({ error: "Server error during registration" }); }
});

// Login user with JWT token generation
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "User not found" });
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Wrong password" });
        const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
});

// Update user profile name
app.put('/api/user/update', (req, res) => {
    const { id, name } = req.body;
    db.query("UPDATE users SET name = ? WHERE id = ?", [name, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Profile updated successfully!" });
    });
});

// Update user password with validation
app.put('/api/user/password', async (req, res) => {
    const { id, newPassword } = req.body;
    if (!id || !newPassword) return res.status(400).json({ error: "User ID and new password are required" });
    if (newPassword.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, id], (err, result) => {
            if (err) { console.error("Password Update Error:", err); return res.status(500).json({ error: "Database error: " + err.message }); }
            if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
            res.json({ message: "Password updated successfully!" });
        });
    } catch (error) { res.status(500).json({ error: "Server error during password update" }); }
});

// CART ROUTES

// Add product to cart (update quantity if already exists)
app.post('/api/cart/add', (req, res) => {
    const { userId, productId, quantity } = req.body;
    db.query("SELECT * FROM cart WHERE user_id = ? AND product_id = ?", [userId, productId], (err, results) => {
        if (results.length > 0) {
            db.query("UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?", [quantity, userId, productId], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Quantity updated" });
            });
        } else {
            db.query("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)", [userId, productId, quantity], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Added to cart" });
            });
        }
    });
});

// Get user's cart with product details
app.get('/api/cart/:userId', (req, res) => {
    db.query("SELECT products.*, cart.quantity FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?", [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Clear user's entire cart
app.delete('/api/cart/clear/:userId', (req, res) => {
    db.query("DELETE FROM cart WHERE user_id = ?", [req.params.userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cart cleared" });
    });
});

// ORDER ROUTES

// Place order with items - creates order and order_items records
app.post('/api/orders', (req, res) => {
    const { userId, email, total, items } = req.body;
    db.query("INSERT INTO orders (user_id, customer_email, total_amount) VALUES (?, ?, ?)", [userId, email, total], (err, result) => {
        if (err) { console.error("Order Insert Error:", err); return res.status(500).json({ error: "Failed to create order" }); }
        const orderId = result.insertId;
        const itemValues = items.map(item => [orderId, item.id, item.pname || item.name, parseFloat(item.price.toString().replace("Rs.", "").replace(",", "")), item.quantity]);
        db.query("INSERT INTO order_items (order_id, product_id, product_pname, price_at_purchase, quantity) VALUES ?", [itemValues], (err, itemResult) => {
            if (err) { console.error("Items Insert Error:", err); return res.status(500).json({ error: "Order created but items failed to save" }); }
            res.status(201).json({ message: "Order placed successfully!", orderId: orderId });
        });
    });
});

// Get order details by order ID
app.get('/api/order-details/:orderId', (req, res) => {
    db.query("SELECT * FROM order_items WHERE order_id = ?", [req.params.orderId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Get all orders for a specific user
app.get('/api/orders/:userId', (req, res) => {
    db.query("SELECT id, total_amount, status, order_date FROM orders WHERE user_id = ? ORDER BY order_date DESC", [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// BLOG ROUTES

// Get all blogs (ordered newest first)
app.get('/api/blogs', (req, res) => {
    db.query("SELECT * FROM blogs ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get single blog by ID with full content
app.get('/api/blogs/:id', (req, res) => {
    db.query("SELECT * FROM blogs WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Blog not found" });
        res.json(results[0]);
    });
});

// Create new blog with image upload
app.post('/api/blogs', upload.single('image'), (req, res) => {
    const { name, title, author, content } = req.body;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    if (!name || !title) return res.status(400).json({ error: "Headline and Category are required" });
    db.query("INSERT INTO blogs (name, title, image, author, date, content) VALUES (?, ?, ?, ?, ?, ?)", [name, title, imagePath, author, date, content || ''], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Blog posted successfully!" });
    });
});

// Delete blog by ID
app.delete('/api/blogs/:id', (req, res) => {
    db.query("DELETE FROM blogs WHERE id = ?", [req.params.id], (err, result) => {
        if (err) { console.error("Delete Error:", err); return res.status(500).json({ error: "Failed to delete blog: " + err.message }); }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Blog not found" });
        res.json({ message: "Blog deleted successfully!" });
    });
});

// REVIEW ROUTES

// Get all reviews for a product with user names
app.get('/api/reviews/:productId', (req, res) => {
    db.query("SELECT product_reviews.*, users.name as user_name FROM product_reviews JOIN users ON product_reviews.user_id = users.id WHERE product_reviews.product_id = ? ORDER BY product_reviews.review_date DESC", [req.params.productId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Add new product review
app.post('/api/reviews', (req, res) => {
    const { userId, productId, comment, rating } = req.body;
    db.query("INSERT INTO product_reviews (user_id, product_id, comment, rating) VALUES (?, ?, ?, ?)", [userId, productId, comment, rating], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Review added!" });
    });
});

// Delete a review by ID
app.delete('/api/reviews/:id', (req, res) => {
    db.query("DELETE FROM product_reviews WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Review deleted" });
    });
});

// ADMIN ROUTES

// Get admin stats - total users and total sales
app.get('/api/admin/stats', (req, res) => {
    db.query("SELECT COUNT(*) as totalUsers FROM users", (err, userRes) => {
        if (err) return res.status(500).json(err);
        db.query("SELECT SUM(total_amount) as totalSales FROM orders", (err, salesRes) => {
            if (err) return res.status(500).json(err);
            res.json({ totalUsers: userRes[0].totalUsers, totalSales: salesRes[0].totalSales || 0 });
        });
    });
});

// Get all orders for admin (with newest first)
app.get('/api/admin/orders', (req, res) => {
    db.query("SELECT * FROM orders ORDER BY order_date DESC", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Update order status (Processing, Shipped, Delivered)
app.put('/api/admin/orders/:id', (req, res) => {
    const { status } = req.body;
    db.query("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status updated" });
    });
});

// OTHER ROUTES

// Subscribe to newsletter
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    db.query("INSERT INTO subscribers (email) VALUES (?)", [email], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Already subscribed!" });
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Subscribed!" });
    });
});
