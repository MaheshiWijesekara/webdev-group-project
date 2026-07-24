import React, { useState } from 'react'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import head from './../../assets/about_page/about-head-shape.webp';
import about1 from './../../assets/about_page/about_img2.jpg';
import about2 from './../../assets/about_page/about_img3.png';
import client1 from './../../assets/about_page/brand-logo-1.png';
import client2 from './../../assets/about_page/brand-logo-2.png';
import client3 from './../../assets/about_page/brand-logo-3.png';
import client4 from './../../assets/about_page/brand-logo-4.png';
import client5 from './../../assets/about_page/brand-logo-5.png';
import client6 from './../../assets/about_page/brand-logo-6.png';

const About = () => {
    const [quote, setQuote] = useState(
        '"Quality products at great prices. I am a loyal customer and highly recommend this store!"'
    )

    const clientData = [
        { img: client1, quote: '"Quality products at great prices. I am a loyal customer and highly recommend this store!"' },
        { img: client2, quote: '"Amazing skincare products and excellent customer service. My skin has never felt better!"' },
        { img: client3, quote: '"Affordable prices, beautiful products, and fast delivery. Definitely one of my favorite stores."' },
        { img: client4, quote: '"The quality is incredible for the price. I keep coming back for more every time."' },
        { img: client5, quote: '"My go-to skincare shop for products that actually work and make my skin glow."' },
        { img: client6, quote: '"Love everything about this store — great products, lovely packaging, and worth every penny."' }
    ]

    return (
        <>
            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* About Header - Clean & Simple */}
            <section className="about-header py-5" style={{
                backgroundColor: 'var(--soft-beige)',
                paddingTop: '40px',
                paddingBottom: '30px'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <span className="d-inline-block mb-3" style={{
                                color: '#B4975A',
                                fontSize: '0.75rem',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                fontWeight: '600'
                            }}>
                                Introducing
                            </span>
                            <h1 className="display-3 fw-bold mb-3" style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#2D402E',
                                letterSpacing: '1px'
                            }}>
                                About <span style={{ color: '#B4975A' }}>Virelle</span>
                            </h1>
                            <p className="lead" style={{
                                color: '#666',
                                maxWidth: '600px',
                                margin: '0 auto',
                                fontSize: '1.1rem',
                                lineHeight: '1.8'
                            }}>
                                Discover skincare made to nourish, hydrate, and bring out your natural glow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main About Content */}
            <section className="about-content py-4" style={{ backgroundColor: 'var(--soft-beige)' }}>
                <div className="container">
                    {/* Mission Statement */}
                    <div className="text-center mb-5">
                        <img src={head} alt="" className="img-fluid mb-3" style={{ maxWidth: '80px' }} />
                        <h2 className="fw-bold" style={{
                            fontFamily: 'Playfair Display, serif',
                            color: '#2D402E',
                            fontSize: '2.2rem',
                            lineHeight: '1.4'
                        }}>
                            We strive to live with compassion, love, <br /> and a sense of purpose
                        </h2>
                        <p className="text-muted mx-auto" style={{
                            maxWidth: '600px',
                            fontSize: '1rem',
                            lineHeight: '1.8',
                            marginTop: '15px'
                        }}>
                            Discover skincare made to nourish, hydrate, and bring out your natural glow. 
                            Every product is crafted with care to help you feel confident in your own skin.
                        </p>
                    </div>

                    {/* About Section 1 - Image Left */}
                    <div className="row align-items-center g-5 mb-5">
                        <div className="col-md-6">
                            <div className="about-image-wrapper" style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(45,64,46,0.06)'
                            }}>
                                <img 
                                    src={about1} 
                                    alt="Give your skin a healthy glow" 
                                    className="img-fluid w-100" 
                                    style={{
                                        height: '400px',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="about-text" style={{ padding: '20px' }}>
                                <span className="d-inline-block mb-3" style={{
                                    color: '#B4975A',
                                    fontSize: '0.7rem',
                                    letterSpacing: '3px',
                                    textTransform: 'uppercase',
                                    fontWeight: '600'
                                }}>
                                    Our Philosophy
                                </span>
                                <h3 className="fw-bold mb-3" style={{
                                    fontFamily: 'Playfair Display, serif',
                                    color: '#2D402E',
                                    fontSize: '1.8rem'
                                }}>
                                    Give your skin a healthy glow
                                </h3>
                                <p className="text-muted" style={{
                                    fontSize: '1rem',
                                    lineHeight: '1.8'
                                }}>
                                    Reveal your natural radiance with skincare designed to nourish, protect, 
                                    and keep your skin feeling fresh every day.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* About Section 2 - Image Right */}
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-2">
                            <div className="about-image-wrapper" style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(45,64,46,0.06)'
                            }}>
                                <img 
                                    src={about2} 
                                    alt="Our Mission" 
                                    className="img-fluid w-100" 
                                    style={{
                                        height: '400px',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s ease',
                                        opacity: 0.95
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 order-md-1">
                            <div className="about-text" style={{ padding: '20px' }}>
                                <span className="d-inline-block mb-3" style={{
                                    color: '#B4975A',
                                    fontSize: '0.7rem',
                                    letterSpacing: '3px',
                                    textTransform: 'uppercase',
                                    fontWeight: '600'
                                }}>
                                    Our Mission
                                </span>
                                <h3 className="fw-bold mb-3" style={{
                                    fontFamily: 'Playfair Display, serif',
                                    color: '#2D402E',
                                    fontSize: '1.8rem'
                                }}>
                                    Empowering Your Natural Beauty
                                </h3>
                                <p className="text-muted" style={{
                                    fontSize: '1rem',
                                    lineHeight: '1.8'
                                }}>
                                    We are committed to helping you feel confident in your own skin. 
                                    Our skincare products are designed to nourish, hydrate, and bring out 
                                    your natural glow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials py-5" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="d-inline-block mb-3" style={{
                            color: '#B4975A',
                            fontSize: '0.7rem',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            fontWeight: '600'
                        }}>
                            Testimonials
                        </span>
                        <h2 className="fw-bold" style={{
                            fontFamily: 'Playfair Display, serif',
                            color: '#2D402E',
                            fontSize: '2rem'
                        }}>
                            What Our Customers Say
                        </h2>
                    </div>

                    {/* Quote Display */}
                    <div className="testimonial-quote text-center mb-5" style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        padding: '30px',
                        backgroundColor: '#F9F7F2',
                        borderRadius: '12px',
                        border: '1px solid rgba(45,64,46,0.06)'
                    }}>
                        <i className="bi bi-quote" style={{
                            fontSize: '2rem',
                            color: '#B4975A',
                            opacity: 0.5
                        }}></i>
                        <p className="fs-4 mb-0 fw-semibold" style={{
                            color: '#2D402E',
                            fontFamily: 'Playfair Display, serif',
                            lineHeight: '1.6'
                        }}>
                            {quote}
                        </p>
                    </div>

                    {/* Brand Logos */}
                    <div className="row justify-content-center align-items-center g-4">
                        {clientData.map((client, index) => (
                            <div 
                                key={index}
                                className="col-6 col-sm-4 col-md-2 d-flex justify-content-center"
                            >
                                <div 
                                    className="brand-logo-wrapper"
                                    onClick={() => setQuote(client.quote)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '15px',
                                        borderRadius: '12px',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: 'transparent',
                                        border: '1px solid transparent',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#F9F7F2';
                                        e.currentTarget.style.borderColor = 'rgba(45,64,46,0.06)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <img 
                                        src={client.img} 
                                        alt={`Brand ${index + 1}`} 
                                        className="img-fluid" 
                                        style={{
                                            maxHeight: '50px',
                                            objectFit: 'contain',
                                            filter: 'grayscale(0%)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) brightness(1.1)'}
                                        onMouseLeave={(e) => e.target.style.filter = 'grayscale(0%)'}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-muted small mt-4" style={{
                        fontSize: '0.75rem',
                        letterSpacing: '1px'
                    }}>
                        Click on a brand to see what they say about us
                    </p>
                </div>
            </section>
        </>
    )
}

export default About