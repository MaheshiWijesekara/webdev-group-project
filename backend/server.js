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

// --- MULTER SETUP ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
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

db.connect(err => {
    if (err) {
        console.error("Database Connection Failed!:", err.message);
    } else {
        console.log("MySQL Connected...");
    }
});

// --- PRODUCTS ROUTES ---

// DOOR 1: GET ALL PRODUCTS (Used by Shop and Admin)
// This version handles SEARCH, PAGINATION, CATEGORY, and LIMIT
app.get('/api/products', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const limit = parseInt(req.query.limit) || 8; // FIXED: Now correctly reads from the URL
    const category = req.query.category || 'all';
    const availability = req.query.availability || 'all';
    const sortBy = req.query.sortBy || 'default';
    
    const offset = (page - 1) * limit;

    // 1. Build the Query
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

    // 3. Final SQL with LIMIT and OFFSET
    const dataSql = `SELECT * ${query} ${sortSql} LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) as total ${query}`;

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

// DOOR 2: GET ONE PRODUCT (Used by ProductDetails)
app.get('/api/products/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]); 
    });
});

// --- USER AUTH ROUTES ---

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

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "User not found" });
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Wrong password" });
        const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1d' });
        res.json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email, role: user.role } 
        });
    });
});

// --- CART ROUTES ---

app.post('/api/cart/add', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const checkSql = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
    db.query(checkSql, [userId, productId], (err, results) => {
        if (results.length > 0) {
            const updateSql = "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
            db.query(updateSql, [quantity, userId, productId], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Quantity updated" });
            });
        } else {
            const insertSql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
            db.query(insertSql, [userId, productId, quantity], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Added to cart" });
            });
        }
    });
});

app.get('/api/cart/:userId', (req, res) => {
    const sql = `SELECT products.*, cart.quantity FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?`;
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.delete('/api/cart/clear/:userId', (req, res) => {
    const sql = "DELETE FROM cart WHERE user_id = ?";
    db.query(sql, [req.params.userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cart cleared" });
    });
});

// --- BLOG ROUTES ---

app.get('/api/blogs', (req, res) => {
    const sql = "SELECT * FROM blogs ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/blogs', upload.single('image'), (req, res) => {
    const { name, title, author } = req.body;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    if (!name || !title) return res.status(400).json({ error: "Headline and Category are required" });
    const sql = "INSERT INTO blogs (name, title, image, author, date) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, title, imagePath, author, date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Blog posted successfully!" });
    });
});

// --- ORDER ROUTES ---

app.post('/api/orders', (req, res) => {
    const { userId, email, total, items } = req.body;

    // 1. First, create the main record in the 'orders' table
    const orderSql = "INSERT INTO orders (user_id, customer_email, total_amount) VALUES (?, ?, ?)";
    
    db.query(orderSql, [userId, email, total], (err, result) => {
        if (err) {
            console.error("Order Insert Error:", err);
            return res.status(500).json({ error: "Failed to create order" });
        }

        // 2. Get the ID of the order we just created
        const orderId = result.insertId;

        // 3. Prepare the items for insertion
        // We create an array of arrays: [[orderId, prodId, name, price, qty], [...]]
        const itemValues = items.map(item => [
            orderId, 
            item.id, 
            item.pname || item.name, 
            parseFloat(item.price.toString().replace("Rs.", "").replace(",", "")), 
            item.quantity
        ]);

        // 4. Insert all items at once into the 'order_items' table
        const itemsSql = "INSERT INTO order_items (order_id, product_id, product_pname, price_at_purchase, quantity) VALUES ?";
        
        db.query(itemsSql, [itemValues], (err, itemResult) => {
            if (err) {
                console.error("Items Insert Error:", err);
                return res.status(500).json({ error: "Order created but items failed to save" });
            }

            res.status(201).json({ 
                message: "Order placed successfully!", 
                orderId: orderId 
            });
        });
    });
});

app.get('/api/order-details/:orderId', (req, res) => {
    const sql = "SELECT * FROM order_items WHERE order_id = ?";
    db.query(sql, [req.params.orderId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.get('/api/orders/:userId', (req, res) => {
    const sql = "SELECT id, total_amount, status, order_date FROM orders WHERE user_id = ? ORDER BY order_date DESC";
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// --- REVIEW ROUTES ---

app.get('/api/reviews/:productId', (req, res) => {
    const sql = `SELECT product_reviews.*, users.name as user_name FROM product_reviews JOIN users ON product_reviews.user_id = users.id WHERE product_reviews.product_id = ? ORDER BY product_reviews.review_date DESC`;
    db.query(sql, [req.params.productId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/reviews', (req, res) => {
    const { userId, productId, comment, rating } = req.body;
    const sql = "INSERT INTO product_reviews (user_id, product_id, comment, rating) VALUES (?, ?, ?, ?)";
    db.query(sql, [userId, productId, comment, rating], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Review added!" });
    });
});

app.delete('/api/reviews/:id', (req, res) => {
    const sql = "DELETE FROM product_reviews WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Review deleted" });
    });
});

// --- ADMIN & OTHER ROUTES ---

app.put('/api/user/update', (req, res) => {
    const { id, name } = req.body;
    db.query("UPDATE users SET name = ? WHERE id = ?", [name, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Profile updated successfully!" });
    });
});

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    const sql = "INSERT INTO subscribers (email) VALUES (?)";
    db.query(sql, [email], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Already subscribed!" });
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Subscribed!" });
    });
});

app.get('/api/admin/stats', (req, res) => {
    const userCountSql = "SELECT COUNT(*) as totalUsers FROM users";
    const salesSql = "SELECT SUM(total_amount) as totalSales FROM orders";
    db.query(userCountSql, (err, userRes) => {
        if (err) return res.status(500).json(err);
        db.query(salesSql, (err, salesRes) => {
            if (err) return res.status(500).json(err);
            res.json({ totalUsers: userRes[0].totalUsers, totalSales: salesRes[0].totalSales || 0 });
        });
    });
});

app.get('/api/admin/orders', (req, res) => {
    const sql = "SELECT * FROM orders ORDER BY order_date DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.put('/api/admin/orders/:id', (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    db.query(sql, [status, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status updated" });
    });
});

app.delete('/api/products/:id', (req, res) => {
    const sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product deleted" });
    });
});

// POST route to Add a New Product (WITH 2 IMAGES)
app.post('/api/products', upload.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'secondImage', maxCount: 1 }
]), (req, res) => {
    const { pname, pdescription, price, tag, category, subcategory, rating, availability } = req.body;
    
    // Get file paths from Multer
    const imagePath = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
    const secondImagePath = req.files['secondImage'] ? `/uploads/${req.files['secondImage'][0].filename}` : null;

    const sql = `INSERT INTO products 
        (image, secondImage, pname, pdescription, price, tag, category, subcategory, rating, availability) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        imagePath, 
        secondImagePath, 
        pname, 
        pdescription, 
        price, 
        tag, 
        category, 
        subcategory, 
        rating || 5, 
        availability || 'In'
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Product added successfully!" });
    });
});

// START SERVER
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));