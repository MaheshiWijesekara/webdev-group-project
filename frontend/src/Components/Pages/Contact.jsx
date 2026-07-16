import React from 'react'

function Contact() {
  return (
    <>
      <section className="contact-section mt-5">
        <div className="container">
            <h2 className="section-title">Keep in Touch with Us</h2>
            <p className="section-subtitle">
                Be the first to know about our latest news and special offers and <br/> expert beauty tips for radiant skin
            </p>
            <div className="row contact-boxes">
                <div className="contact-col">
                    <div className="contact-box bg-transparent bg-0">
                        <i class="bi bi-geo-alt-fill"></i>
                        <h5>Address</h5>
                        <p>123 Main Street, New York, NY 10001</p>
                        <p className="mb-4">123 Main Street, New York, NY 10001</p>
                        <a href="https://www.google.com/maps" className="link" target='_blank' rel='noopener noreferrer'>Get Direction</a>
                    </div>
                </div>
                <div className="contact-col">
                    <div className="contact-box bg-transparent border-0">
                        <i className='bi bi-telephone'></i>
                        <h5>Contact</h5>
                        <p><strong>Mobile: </strong>+94 123 456 789</p>
                        <p><strong>Hotline: </strong>1800 123 456</p>
                        <p><strong>Email: </strong>support@example.com</p>
                    </div>
                </div>
                <div className="contact-col">
                    <div className="contact-box bg-transparent border-0">
                        <i className='bi bi-clock'></i>
                        <h5>Hours of Operation</h5>
                        <p><strong>Mon - Fri: </strong>9:00 AM - 6:00 PM</p>
                        <p><strong>Sat - Sun: </strong>9.30 AM - 5.30 PM</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

    <div className="contact-page">
        {/* map section */}
        <section id="map" className='map-section container'>
            <iframe 
            title="Our Location"
            className='map rounded'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.05058488745!2d-74.30916474477921!3d40.69719335405008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2slk!4v1781457860542!5m2!1sen!2slk"  
            allowfullscreen>
            </iframe>
        </section>

        <section className="message-section">
            <h2 className="form-title">Send A Message</h2>
            <form action="" className="contact-form">
                <div className="row">
                    <input type="text" className="input" placeholder='Name'/>
                    <input type="email" className="input" placeholder='Email'/>
                </div>
                <div className="row">
                    <textarea placeholder='Message' className="textarea"></textarea>
                </div>
                <button className="btn px-5" type='submit'>Submit</button>
            </form>
        </section>

    </div>

    </>
  )
}

export default Contact
