import React, { useState } from 'react'

import head from './../../assets/about_page/about-head-shape.webp';
import about1 from './../../assets/about_page/about_img2.jpg';
import about2 from './../../assets/about_page/about_img3.png';
import client1 from './../../assets/about_page/brand-logo-1.png';
import client2 from './../../assets/about_page/brand-logo-2.png';
import client3 from './../../assets/about_page/brand-logo-3.png';
import client4 from './../../assets/about_page/brand-logo-4.png';
import client5 from './../../assets/about_page/brand-logo-5.png';
import client6 from './../../assets/about_page/brand-logo-6.png';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const About = () => {

    const [quote, setQuote] = useState(
        '"Quality products at great prices. I am a loyal customer and highly recommend this store!"'
    )

  return (
    <>

    <Breadcrumbs />

    {/* about head */}

    <section className="about-glowing-section d-flex align-items-center">
        <div className="container">
            <div className="row">
                <div className="col-md-6 text-md-start text-center">
                    <p className="text-uppercase small mb-2 about-subtitle ">Introducing</p>
                    <h1 className="fw-bold display-5 about-title">About Virelle</h1>
                </div>
            </div>
        </div>
    </section>

    {/* main about */}

    <section className="py-5">
        <div className="container text-center mb-5">
            <img src={head} alt="" className="img-fluid" />
            <h2 className="fw-bold">
                We strive to live with compassion, love, <br /> and a sense of purpose
            </h2>
            <p className="text-muted mx-auto" style={{maxWidth: '600px'}}>
                Discover skincare made to nourish, hydrate, and bring out your natural glow. Every product is crafted with care to help you feel confident in your own skin.
            </p>
        </div>

        <div className="container mb-5">
            <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb--md-0 about-img1">
                    <img src={about1} alt="" className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h4 className="fw-bold">Give your skin a healthy glow</h4>
                    <p className="text-muted">Reveal your natural radiance with skincare designed to nourish, protect, and keep your skin feeling fresh every day.</p>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="row align-items-center flex-md-row-reverse">
                <div className="col-md-6 mb-4 mb-md-0 about-img1">
                    <img src={about2} alt="" className="img-fluid rounded" style={{ opacity: 0.9 }} />
                </div>
                <div className="col-md-6">
                    <h4 className="fw-bold">Our Mission</h4>
                    <p className="text-muted">We are committed to helping you feel confident in your own skin. 
                        Our skincare products are designed to nourish, hydrate, and bring out your natural glow.</p>
                </div>
            </div>
        </div>
    </section>

    <section className="container-fluid bg-light">
        <div className="container py-5 text-center">
            <div className="mx-auto" style={{maxWidth: '800px'}}>
                <p className="fs-4 mb-4 fw-bold">{quote}</p>
            </div>
            <div className="row justify-content-center align-items-center mt-5 gy-4">
                <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                onClick={() => setQuote('"Quality products at great prices. I am a loyal customer and highly recommend this store!"')} style={{cursor: 'pointer'}}>
                    <img src={client1} alt="" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}} />
                </div>
                <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                onClick={() => setQuote('"Amazing skincare products and excellent customer service. My skin has never felt better!"')} style={{cursor: 'pointer'}}>
                    <img src={client2} alt="" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}} />
                </div>
                <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                onClick={() => setQuote('"Affordable prices, beautiful products, and fast delivery. Definitely one of my favorite stores."')} style={{cursor: 'pointer'}}>
                    <img src={client3} alt="" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}} />
                </div>
                <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                onClick={() => setQuote('"The quality is incredible for the price. I keep coming back for more every time."')} style={{cursor: 'pointer'}}>
                    <img src={client4} alt="" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}} />
                </div>
                <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                onClick={() => setQuote('"My go-to skincare shop for products that actually work and make my skin glow."')} style={{cursor: 'pointer'}}>
                    <img src={client5} alt="" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}} />
                </div>
                <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                onClick={() => setQuote('"Love everything about this store — great products, lovely packaging, and worth every penny."')} style={{cursor: 'pointer'}}>
                    <img src={client6} alt="" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}} />
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default About
