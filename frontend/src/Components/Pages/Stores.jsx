import React from 'react'
import store1 from './../../assets/store_page/store1.png';
import store2 from './../../assets/store_page/store2.png';
import store3 from './../../assets/store_page/store3.png';

import {Link} from 'react-router-dom'

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';


function Stores() {
  return (
    <>
        <Breadcrumbs />
        

        <div className="container store-wrap my-3 py-3">
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
                    <h2 className='section-title mb-4'>New York Store</h2>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h5 className='subtitle fw-semibold mb-4'>Address</h5>
                            <p className="text-muted mb-0">3242 Abbot Kinney BLVD- </p>
                            <p className="text-muted">PH Venice, CA 124</p>
                            <Link to="/contact#map" className="underline-link text-black">Get Direction</Link>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h5 className="subtitle fw-semibold mb-4">Hour of Operation</h5>
                            <div className="d-flex gap-4 text-muted">
                                <span><b>Mon - Fri : </b></span>
                                <span>9:00 AM - 8:00 PM</span>
                            </div>

                            <div className="d-flex gap-4 text-muted">
                                <span><b>Sat - Sun : </b></span>
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

        <div className="container store-wrap my-3 py-3">
            <div className="row align-items-center g-5">
                <div className="col-lg-6">
                    <h2 className="section-title mb-4">California Store</h2>

                    <div className='row'>
                        <div className="col-md-6 mb-">
                            <h5 className="subtitle fw-semibold mb-4">Address</h5>
                            <p className='text-muted mb-0'>3422 Abbot Kinney BLVD</p>
                            <p className='text-muted'>PH Venice, CA 124</p>
                            <Link to="/contact#map" className="underline-link text-black">Get Direction</Link>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h5 className="subtitle fw-semibold mb-4">Hour of Operation</h5>
                            <div className="d-flex gap-4 text-muted">
                                <span><b>Mon- Fri : </b></span>
                                <span>9:00 AM - 8:00 PM</span>
                            </div>

                            <div className="d-flex gap-4 text-muted">
                                <span><b>Sat - Sun : </b></span>
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


        <div className="container store-wrap my-3 py-3">
            

            <div className="row align-items-center g-5">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <img src={store3} alt="" className="img-fluid" />
                </div>
                <div className="col-lg-6">
                    <h2 className='section-title mb-4'>Texas Store</h2>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h5 className='subtitle fw-semibold mb-4'>Address</h5>
                            <p className="text-muted mb-0">3242 Abbot Kinney BLVD- </p>
                            <p className="text-muted">PH Venice, CA 124</p>
                            <Link to="/contact#map" className="underline-link text-black">Get Direction</Link>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h5 className="subtitle fw-semibold mb-4">Hour of Operation</h5>
                            <div className="d-flex gap-4 text-muted">
                                <span><b>Mon - Fri : </b></span>
                                <span>9:00 AM - 8:00 PM</span>
                            </div>

                            <div className="d-flex gap-4 text-muted">
                                <span><b>Sat - Sun : </b></span>
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

    </>
  )
}

export default Stores
