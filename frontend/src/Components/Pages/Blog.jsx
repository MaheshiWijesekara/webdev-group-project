import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Nav/Nav';

function Blog() {
    const { user } = useContext(AuthContext); // To get the logged-in user's name
    const [blogs, setBlogs] = useState([]);
    const [showForm, setShowForm] = useState(false); // Toggle form modal
    
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

    // 2. Handle Submit using FormData (Required for File Uploads)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            return toast.error("Please login to post a blog");
        }

        if (!file) {
            return toast.error("Please select an image to upload");
        }

        // We use FormData because we are sending a physical file, not just text
        const formData = new FormData();
        formData.append('name', newBlog.name);
        formData.append('title', newBlog.title);
        formData.append('author', `By ${user.name}`);
        formData.append('image', file); // 'image' must match upload.single('image') in server.js

        try {
            await axios.post('http://localhost:5000/api/blogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Tells the server to expect a file
                }
            });

            toast.success("Blog posted successfully!");
            setNewBlog({ name: '', title: '' }); // Reset text fields
            setFile(null); // Clear the file state
            setShowForm(false); // Close modal
            fetchBlogs(); // Refresh the list from the database
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error("Error posting blog. Make sure your server is running.");
        }
    };

    return (
        <>
            <Navbar />
            
            {/* Breadcrumbs */}
            

            <div className="container py-5 mt-5 pt-5">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="fw-semibold text-center">LATEST NEWS</h1>
                    {/* Only show "Write a Blog" if user is logged in */}
                    {user && (
                        <button className="btn btn-dark px-4 py-2" onClick={() => setShowForm(true)}>
                            + Write a Blog
                        </button>
                    )}
                </div>

                <div className="row g-4">
                    {blogs.map(blog => (
                        <div className='col-lg-4 col-md-6' key={blog.id}>
                            <div className="blog-items text-center position-relative shadow-sm rounded bg-white h-100 pb-3 transition-hover">
                                <div className="blog-image w-100 overflow-hidden" style={{height: '250px'}}>
                                    <img 
                                        /* 
                                           LOGIC: If the image path starts with /uploads, it's a server file.
                                           If it starts with /Images, it's a public folder file.
                                        */
                                        src={blog.image && blog.image.startsWith('/uploads') 
                                            ? `http://localhost:5000${blog.image}` 
                                            : blog.image} 
                                        alt={blog.name} 
                                        className="img-fluid w-100 h-100 object-fit-cover" 
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=Virelle+Beauty"; }}
                                    />
                                </div>
                                <div className="blog-content pt-3 px-3">
                                    <span className="text-muted small text-uppercase fw-bold" style={{letterSpacing: '1px'}}>{blog.title}</span>
                                    <h4 className="mt-2 fw-bold text-dark" style={{fontSize: '1.2rem'}}>{blog.name}</h4>
                                    <div className="d-flex justify-content-center gap-3 mt-3 border-top pt-3">
                                        <span className="small text-muted">{blog.author}</span>
                                        <span className="small text-muted border-start ps-3">{blog.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- ADD BLOG MODAL (Manual UI implementation) --- */}
            {showForm && (
                <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-4 border-0 rounded-4 shadow-lg">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold m-0">Create New Post</h3>
                                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Headline</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g. Tips to Apply Luxury Cream" 
                                        value={newBlog.name}
                                        onChange={(e) => setNewBlog({...newBlog, name: e.target.value})} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Category</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g. Natural Cleansers" 
                                        value={newBlog.title}
                                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} 
                                        required 
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold">Upload Header Image</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        accept="image/*" 
                                        /* We use files[0] to capture the actual file object */
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        required 
                                    />
                                    <div className="form-text">JPG, PNG or WEBP recommended.</div>
                                </div>

                                <button type="submit" className="btn btn-dark w-100 py-2 fw-bold">
                                    PUBLISH BLOG
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
}

export default Blog;