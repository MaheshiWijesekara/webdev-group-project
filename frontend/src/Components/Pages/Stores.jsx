import React from 'react'
import store1 from './../../assets/store-01.webp';
import store2 from './../../assets/store-02.webp';

import {Link} from 'react-router-dom'


function Stores() {
  return (
    <>
        <ol className="section-banner py-3 position-relative">
            <li className="position-relative"><Link to="/">Home</Link></li>
            <li className="position-relative active"><span className='ps-5'>Stores</span></li>
        </ol>

        <div className="container store-wrap my-5 py-5">
            <div className="row">
                <div className="section-title mb-5 stores-title text-center">
                    <h2 className="fw-semibold fs-1">Find a Store</h2>
                    <p>We're talking about clean beauty gift sets, of course <br/> and we've got a bouquet of beauties for yourself or someone you love</p>
                </div>
            </div>

            <div className="row align-items-center g-5">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <img src={store1} alt="" className="img-fluid" />
                </div>
                <div className="col-lg-6">
                    <h2 className='mb-4'>New York Store</h2>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h5 className='subtitle fw-semibold mb-4'>Address</h5>
                            <p className="text-muted mb-0">3242 Abbot Kinney BLVD- </p>
                            <p className="text-muted">PH Venice, CA 124</p>
                            <a href="#" className="underline-link text-black">Get Direction</a>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h5 className="subtitle fw-semibold mb-4">Hour of Operation</h5>
                            <div className="d-flex gap-5 text-muted">
                                <span>Mon - Fri: </span>
                                <span>9:00 AM - 8:00 PM</span>
                            </div>

                            <div className="d-flex gap-5 text-muted">
                                <span>Sat - Sun: </span>
                                <span>10:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h5 className="subtitle fw-semibold mb-4">Contact</h5>
                            <p className="text-muted mb-0">Mobile: <strong className='text-dark'>087 1234 5678</strong></p>
                            <p className="text-muted mb-0">Mobile: <strong className='text-dark'>087 1234 5678</strong></p>
                            <p className="text-muted">Email: hello@gmail.com</p>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h5 className="fw-semibold">Social Media</h5>
                            <div className="store-social-icons d-flex gap-3 mt-4">
                                <i className="fa-brands fa-facebook-f"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                                <i className="fa-brands fa-youtube"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container store-wrap my-5 py-5">
            <div className="row align-items-center g-5">
                <div className="col-lg-6">
                    <h2 className="section-title mb-4">California Store</h2>

                    <div className='row'>
                        <div className="col-md-6 mb-">
                            <h5 className="subtitle fw-semibold mb-4">Address</h5>
                            <p className='text-muted mb-0'>3422 Abbot Kinney BLVD</p>
                            <p className='text-muted'>PH Venice, CA 124</p>
                            <a href="#" className="underline-link text-black">Get Direction</a>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h5 className="subtitle fw-semibold mb-4">Hour of Operation</h5>
                            <div className="d-flex gap-5 text-muted">
                                <span>Mon - Fri: </span>
                                <span>9:00 AM - 8:00 PM</span>
                            </div>

                            <div className="d-flex gap-5 text-muted">
                                <span>Sat - Sun: </span>
                                <span>10:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h5 className="subtitle fw-semibold mb-4">Contact</h5>
                            <p className="text-muted mb-0">Mobile: <strong className='text-dark'>087 1234 5678</strong></p>
                            <p className="text-muted mb-0">Mobile: <strong className='text-dark'>087 1234 5678</strong></p>
                            <p className="text-muted">Email: hello@gmail.com</p>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h5 className="fw-semibold">Social Media</h5>
                            <div className="store-social-icons d-flex gap-3 mt-4">
                                <i className="fa-brands fa-facebook-f"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                                <i className="fa-brands fa-youtube"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 mb-4 mb-lg-0">
                    <img src={store2} alt="" className="img-fluid" />
                </div>

            </div>
        </div>

    </>
  )
}

export default Stores
