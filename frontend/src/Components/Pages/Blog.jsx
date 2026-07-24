import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Nav/Nav';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

function Blog() {
    const { user } = useContext(AuthContext); 
    const [blogs, setBlogs] = useState([]);
    const [showForm, setShowForm] = useState(false); 
    
    // New Blog State for Text Fields
    const [newBlog, setNewBlog] = useState({
        name: '',
        title: ''
    });

    // State for the actual File object
    const [file, setFile] = useState(null);

    // 1. Fetch Blogs from Database
    const fetchBlogs = () => {
        axios.get('http://localhost:5000/api/blogs')
            .then(res => {
                setBlogs(res.data);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
            });
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // 2. Handle Submit using FormData
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) return toast.error("Please login to post a blog");
        if (!file) return toast.error("Please select an image to upload");

        const formData = new FormData();
        formData.append('name', newBlog.name);
        formData.append('title', newBlog.title);
        formData.append('author', `By ${user.name}`);
        formData.append('image', file); 

        try {
            await axios.post('http://localhost:5000/api/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success("Article published successfully!");
            setNewBlog({ name: '', title: '' }); 
            setFile(null); 
            setShowForm(false); 
            fetchBlogs(); 
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error("Error posting blog.");
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--soft-beige)', minHeight: '100vh' }}>
            <Navbar />

            
            <Breadcrumbs />

                  
            {/* Header Section */}
            <div className="container py-5">
                <div className="text-center mb-5 mt-4">
                    <h1 className="display-4 fw-bold mt-2" style={{ fontFamily: 'Playfair Display', color: 'var(--primary-green)' }}>The Virelle Journal</h1>
                    <div className="mx-auto mt-3" style={{ width: '60px', height: '2px', backgroundColor: 'var(--primary-green)' }}></div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
                    <p className="m-0 text-muted fst-italic">Expert beauty tips and natural skincare secrets.</p>
                    {user && (
                        <button className="btn btn-dark px-4 py-2" onClick={() => setShowForm(true)} style={{ borderRadius: '0', fontSize: '0.85rem' }}>
                            + WRITE AN ARTICLE
                        </button>
                    )}
                </div>

                {/* Blog Grid */}
                <div className="row g-5">
                    {blogs.map(blog => (
                        <div className='col-lg-4 col-md-6' key={blog.id}>
                            <div className="card h-100 border-0 bg-white shadow-sm overflow-hidden" style={{ transition: 'all 0.3s ease' }}>
                                <div className="position-relative" style={{ height: '260px', overflow: 'hidden' }}>
                                    <img 
                                        src={blog.image && blog.image.startsWith('/uploads') 
                                            ? `http://localhost:5000${blog.image}` 
                                            : blog.image} 
                                        alt={blog.name} 
                                        className="w-100 h-100 object-fit-cover transition-hover"
                                        style={{ transition: '0.6s ease' }}
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=Virelle+Beauty"; }}
                                    />
                                    <span className="position-absolute top-0 start-0 m-3 badge" style={{ backgroundColor: 'var(--primary-green)', padding: '8px 15px', borderRadius: '0', fontSize: '0.7rem', letterSpacing: '1px' }}>
                                        {blog.title.toUpperCase()}
                                    </span>
                                </div>
                                
                                <div className="card-body p-4 d-flex flex-column">
                                    <h4 className="fw-bold mb-3" style={{ fontFamily: 'Playfair Display', color: 'var(--primary-green)', lineHeight: '1.4' }}>
                                        {blog.name}
                                    </h4>
                                    
                                    <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                                        <span className="small fw-semibold text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>{blog.author}</span>
                                        <span className="small text-muted" style={{ fontSize: '0.7rem' }}>{blog.date}</span>
                                    </div>
                                    
                                    <Link 
    to={`/blog/${blog.id}`} 
    className="journal-link mt-auto pt-3 text-decoration-none fw-bold"
>
    READ ARTICLE →
</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- ADD BLOG MODAL --- */}
            {showForm && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(45, 64, 46, 0.8)', backdropFilter: 'blur(5px)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-4 border-0 rounded-0 shadow-lg" style={{ backgroundColor: 'var(--soft-beige)' }}>
                            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                <h3 className="fw-bold m-0" style={{ fontFamily: 'Playfair Display', color: 'var(--primary-green)' }}>New Journal Entry</h3>
                                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-muted">ARTICLE HEADLINE</label>
                                    <input 
                                        type="text" 
                                        className="form-control rounded-0 border-0 bg-white" 
                                        placeholder="e.g. The Magic of Sandalwood" 
                                        value={newBlog.name}
                                        onChange={(e) => setNewBlog({...newBlog, name: e.target.value})} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-muted">CATEGORY</label>
                                    <input 
                                        type="text" 
                                        className="form-control rounded-0 border-0 bg-white" 
                                        placeholder="e.g. Herbal Rituals" 
                                        value={newBlog.title}
                                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} 
                                        required 
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted">HEADER IMAGE</label>
                                    <input 
                                        type="file" 
                                        className="form-control rounded-0 border-0 bg-white" 
                                        accept="image/*" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        required 
                                    />
                                </div>

                                <button type="submit" className="btn btn-dark w-100 py-3 fw-bold rounded-0" style={{ backgroundColor: 'var(--primary-green)', letterSpacing: '2px' }}>
                                    PUBLISH TO JOURNAL
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}

export default Blog;