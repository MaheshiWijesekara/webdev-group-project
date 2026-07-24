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
    const [selectedBlog, setSelectedBlog] = useState(null); // For popup
    const [newBlog, setNewBlog] = useState({
        name: '',
        title: '',
        content: '' // Added content field
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

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

    // Fetch full blog content when opening popup
    const openBlogPopup = async (blog) => {
        setLoading(true);
        try {
            // If the blog already has content, use it
            if (blog.content) {
                setSelectedBlog(blog);
                document.body.style.overflow = 'hidden';
                setLoading(false);
                return;
            }
            
            // Otherwise fetch full content from API
            const response = await axios.get(`http://localhost:5000/api/blogs/${blog.id}`);
            setSelectedBlog(response.data);
            document.body.style.overflow = 'hidden';
        } catch (err) {
            console.error("Error fetching blog content:", err);
            // Fallback: use the blog data we already have
            setSelectedBlog(blog);
        } finally {
            setLoading(false);
        }
    };

    // Function to close blog popup
    const closeBlogPopup = () => {
        setSelectedBlog(null);
        document.body.style.overflow = 'auto';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) return toast.error("Please login to post a blog");
        if (!file) return toast.error("Please select an image to upload");

        const formData = new FormData();
        formData.append('name', newBlog.name);
        formData.append('title', newBlog.title);
        formData.append('author', `By ${user.name}`);
        formData.append('content', newBlog.content);
        formData.append('image', file); 

        try {
            await axios.post('http://localhost:5000/api/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success("Article published successfully!");
            setNewBlog({ name: '', title: '', content: '' }); 
            setFile(null); 
            setShowForm(false); 
            fetchBlogs(); 
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error(err.response?.data?.error || "Error posting blog.");
        }
    };

    // Get unique categories from blogs
    const categories = [...new Set(blogs.map(blog => blog.title))];

    return (
        <div style={{ backgroundColor: 'var(--soft-beige)', minHeight: '100vh' }}>
            <Navbar />

            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Blog Header - Clean & Simple */}
            <section className="blog-header py-4" style={{
                backgroundColor: 'var(--soft-beige)',
                paddingTop: '30px',
                paddingBottom: '20px'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <span className="d-inline-block mb-2" style={{
                                color: '#B4975A',
                                fontSize: '0.7rem',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                fontWeight: '600'
                            }}>
                                Our Journal
                            </span>
                            <h1 className="display-3 fw-bold mb-2" style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#2D402E',
                                letterSpacing: '1px'
                            }}>
                                The <span style={{ color: '#B4975A' }}>Virelle</span> Journal
                            </h1>
                            <p className="lead" style={{
                                color: '#666',
                                maxWidth: '600px',
                                margin: '0 auto',
                                fontSize: '1rem',
                                lineHeight: '1.8'
                            }}>
                                Expert beauty tips and natural skincare secrets.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Toolbar - Categories & Write Button */}
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center py-3" style={{
                    borderTop: '1px solid rgba(45,64,46,0.08)',
                    borderBottom: '1px solid rgba(45,64,46,0.08)'
                }}>
                    <div className="d-flex flex-wrap gap-2">
                        <button 
                            className="btn btn-sm px-3 py-1 fw-semibold"
                            style={{
                                backgroundColor: '#2D402E',
                                color: 'white',
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                                letterSpacing: '0.5px',
                                border: 'none'
                            }}
                        >
                            All
                        </button>
                        {categories.slice(0, 5).map((category, index) => (
                            <button 
                                key={index}
                                className="btn btn-sm px-3 py-1"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#666',
                                    borderRadius: '20px',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.5px',
                                    border: '1px solid #eee',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#2D402E';
                                    e.target.style.color = 'white';
                                    e.target.style.borderColor = '#2D402E';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#666';
                                    e.target.style.borderColor = '#eee';
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    
                    {user && (
                        <button 
                            className="btn px-4 py-2"
                            onClick={() => setShowForm(true)}
                            style={{
                                backgroundColor: '#B4975A',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                fontWeight: '600',
                                border: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#2D402E'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#B4975A'}
                        >
                            + Write an Article
                        </button>
                    )}
                </div>
            </div>

            {/* Blog Grid */}
            <div className="container py-5">
                <div className="row g-4">
                    {blogs.map(blog => (
                        <div className='col-lg-4 col-md-6' key={blog.id}>
                            <div className="blog-card" style={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                                transition: 'all 0.4s ease',
                                border: '1px solid rgba(45,64,46,0.06)',
                                height: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
                            }}>
                                {/* Blog Image */}
                                <div className="blog-image-wrapper" style={{
                                    height: '220px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img 
                                        src={blog.image && blog.image.startsWith('/uploads') 
                                            ? `http://localhost:5000${blog.image}` 
                                            : blog.image} 
                                        alt={blog.name} 
                                        className="w-100 h-100"
                                        style={{
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                        onError={(e) => { 
                                            e.target.src = "https://via.placeholder.com/400x250?text=Virelle+Beauty"; 
                                        }}
                                    />
                                    {/* Category Badge */}
                                    <span style={{
                                        position: 'absolute',
                                        top: '15px',
                                        left: '15px',
                                        backgroundColor: '#B4975A',
                                        color: 'white',
                                        padding: '4px 15px',
                                        fontSize: '0.6rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        borderRadius: '20px'
                                    }}>
                                        {blog.title}
                                    </span>
                                </div>

                                {/* Blog Content */}
                                <div className="p-4 d-flex flex-column" style={{ minHeight: '180px' }}>
                                    <h4 className="fw-bold mb-2" style={{
                                        fontFamily: 'Playfair Display, serif',
                                        color: '#2D402E',
                                        fontSize: '1.2rem',
                                        lineHeight: '1.4'
                                    }}>
                                        {blog.name}
                                    </h4>
                                    
                                    <div className="mt-auto pt-3 d-flex justify-content-between align-items-center" style={{
                                        borderTop: '1px solid rgba(45,64,46,0.06)'
                                    }}>
                                        <span className="small" style={{
                                            color: '#666',
                                            fontSize: '0.7rem',
                                            fontWeight: '500'
                                        }}>
                                            {blog.author || 'Virelle Team'}
                                        </span>
                                        <span className="small text-muted" style={{
                                            fontSize: '0.7rem'
                                        }}>
                                            {blog.date || 'Dec 2024'}
                                        </span>
                                    </div>
                                    
                                    {/* Read Article Button */}
                                    <button 
                                        onClick={() => openBlogPopup(blog)}
                                        className="journal-link mt-3"
                                        style={{
                                            color: '#2D402E',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            letterSpacing: '1px',
                                            textDecoration: 'none',
                                            borderBottom: '2px solid #B4975A',
                                            paddingBottom: '2px',
                                            display: 'inline-block',
                                            width: 'fit-content',
                                            transition: 'all 0.3s ease',
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: '2px solid #B4975A',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#B4975A';
                                            e.target.style.borderBottomColor = '#2D402E';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#2D402E';
                                            e.target.style.borderBottomColor = '#B4975A';
                                        }}
                                    >
                                        Read Article →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- BLOG POPUP / MODAL --- */}
            {selectedBlog && (
                <div 
                    className="blog-popup-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeBlogPopup();
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(45, 64, 46, 0.85)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                        animation: 'fadeIn 0.3s ease'
                    }}
                >
                    <div className="blog-popup-content" style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        maxWidth: '700px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                        animation: 'slideUp 0.4s ease'
                    }}>
                        {/* Close Button */}
                        <div style={{
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'white',
                            zIndex: 10,
                            padding: '15px 20px',
                            borderBottom: '1px solid rgba(45,64,46,0.06)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                fontSize: '0.7rem',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                color: '#B4975A',
                                fontWeight: '600'
                            }}>
                                {selectedBlog.title}
                            </span>
                            <button
                                onClick={closeBlogPopup}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#666',
                                    padding: '5px 10px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#dc3545'}
                                onMouseLeave={(e) => e.target.style.color = '#666'}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Popup Content */}
                        <div className="p-4">
                            {/* Loading State */}
                            {loading && (
                                <div className="text-center py-5">
                                    <div className="spinner-border" role="status" style={{ color: '#B4975A' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2 text-muted">Loading article...</p>
                                </div>
                            )}

                            {!loading && (
                                <>
                                    {/* Featured Image */}
                                    <div style={{
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        height: '250px',
                                        backgroundColor: '#f8f9fa'
                                    }}>
                                        <img 
                                            src={selectedBlog.image && selectedBlog.image.startsWith('/uploads') 
                                                ? `http://localhost:5000${selectedBlog.image}` 
                                                : selectedBlog.image} 
                                            alt={selectedBlog.name}
                                            className="w-100 h-100"
                                            style={{ objectFit: 'cover' }}
                                            onError={(e) => { 
                                                e.target.src = "https://via.placeholder.com/700x350?text=Virelle+Beauty"; 
                                            }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h2 className="fw-bold mb-2" style={{
                                        fontFamily: 'Playfair Display, serif',
                                        color: '#2D402E',
                                        fontSize: '1.8rem',
                                        lineHeight: '1.3'
                                    }}>
                                        {selectedBlog.name}
                                    </h2>

                                    {/* Meta Info */}
                                    <div className="d-flex gap-3 mb-4" style={{
                                        fontSize: '0.8rem',
                                        color: '#666'
                                    }}>
                                        <span>
                                            <i className="bi bi-person me-1"></i>
                                            {selectedBlog.author || 'Virelle Team'}
                                        </span>
                                        <span>
                                            <i className="bi bi-calendar3 me-1"></i>
                                            {selectedBlog.date || 'Dec 2024'}
                                        </span>
                                        <span style={{
                                            backgroundColor: '#F9F7F2',
                                            padding: '2px 12px',
                                            borderRadius: '20px',
                                            color: '#B4975A',
                                            fontWeight: '600'
                                        }}>
                                            {selectedBlog.title}
                                        </span>
                                    </div>

                                    {/* Full Content from Database */}
                                    <div style={{
                                        color: '#444',
                                        lineHeight: '1.8',
                                        fontSize: '0.95rem'
                                    }}>
                                        {selectedBlog.content ? (
                                            <div dangerouslySetInnerHTML={{ 
                                                __html: selectedBlog.content.replace(/\n/g, '<br />') 
                                            }} />
                                        ) : (
                                            <div>
                                                <p style={{ color: '#999', fontStyle: 'italic' }}>
                                                    No full content available for this article yet.
                                                </p>
                                                <p>
                                                    {selectedBlog.name} — This article is currently being written. 
                                                    Check back soon for the full content!
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Share Section */}
                                    <div className="mt-4 pt-3" style={{
                                        borderTop: '1px solid rgba(45,64,46,0.06)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: '10px'
                                    }}>
                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                                            <i className="bi bi-clock me-1"></i>
                                            {selectedBlog.date || 'Dec 2024'}
                                        </span>
                                        <div className="d-flex gap-2">
                                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Share:</span>
                                            <button className="border-0 bg-transparent" style={{ color: '#666', transition: 'all 0.3s ease' }}
                                                onMouseEnter={(e) => e.target.style.color = '#1877f2'}
                                                onMouseLeave={(e) => e.target.style.color = '#666'}>
                                                <i className="bi bi-facebook"></i>
                                            </button>
                                            <button className="border-0 bg-transparent" style={{ color: '#666', transition: 'all 0.3s ease' }}
                                                onMouseEnter={(e) => e.target.style.color = '#000000'}
                                                onMouseLeave={(e) => e.target.style.color = '#666'}>
                                                <i className="bi bi-twitter-x"></i>
                                            </button>
                                            <button className="border-0 bg-transparent" style={{ color: '#666', transition: 'all 0.3s ease' }}
                                                onMouseEnter={(e) => e.target.style.color = '#E4405F'}
                                                onMouseLeave={(e) => e.target.style.color = '#666'}>
                                                <i className="bi bi-instagram"></i>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- ADD BLOG MODAL --- */}
            {showForm && (
                <div className="modal show d-block" tabIndex="-1" style={{ 
                    backgroundColor: 'rgba(45, 64, 46, 0.8)', 
                    backdropFilter: 'blur(5px)', 
                    zIndex: 1050 
                }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content p-4 border-0" style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
                        }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold m-0" style={{
                                    fontFamily: 'Playfair Display, serif',
                                    color: '#2D402E',
                                    fontSize: '1.8rem'
                                }}>
                                    New Journal Entry
                                </h3>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowForm(false)}
                                ></button>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px' }}>
                                        Article Headline
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g. The Magic of Sandalwood" 
                                        value={newBlog.name}
                                        onChange={(e) => setNewBlog({...newBlog, name: e.target.value})} 
                                        required 
                                        style={{
                                            padding: '12px 15px',
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px' }}>
                                        Category
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g. Herbal Rituals" 
                                        value={newBlog.title}
                                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} 
                                        required 
                                        style={{
                                            padding: '12px 15px',
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px' }}>
                                        Article Content
                                    </label>
                                    <textarea 
                                        className="form-control" 
                                        rows="5"
                                        placeholder="Write your full article content here..." 
                                        value={newBlog.content}
                                        onChange={(e) => setNewBlog({...newBlog, content: e.target.value})} 
                                        style={{
                                            padding: '12px 15px',
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s ease',
                                            resize: 'vertical'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px' }}>
                                        Header Image
                                    </label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        accept="image/*" 
                                        onChange={(e) => setFile(e.target.files[0])} 
                                        required 
                                        style={{
                                            padding: '10px 15px',
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn w-100 py-3 fw-bold"
                                    style={{
                                        backgroundColor: '#2D402E',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
                                >
                                    Publish to Journal
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