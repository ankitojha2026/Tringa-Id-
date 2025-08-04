import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="govt-header">
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <div className="d-flex align-items-center">
              <div className="govt-logo me-3">
                <img 
                  src="/images/india-emblem.png" 
                  alt="भारत सरकार" 
                  className="w-100 h-100 object-fit-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <div style={{display: 'none'}}>🇮🇳</div>
              </div>
              <div>
                <h1 className="govt-title mb-0">
                  तिरंगा पहचान पत्र जनरेटर
                </h1>
                <h2 className="govt-title mb-1" style={{fontSize: '1.4rem', fontWeight: '700'}}>
                  Tiranga Identity Card Generator
                </h2>
                <p className="govt-subtitle mb-0">
                  भारत सरकार | Government of India
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
            <nav>
              <Link 
                to="/privacy" 
                className="text-decoration-none text-dark me-3 fw-semibold"
                style={{fontSize: '0.9rem'}}
              >
                गोपनीयता नीति
              </Link>
              <Link 
                to="/terms" 
                className="text-decoration-none text-dark fw-semibold"
                style={{fontSize: '0.9rem'}}
              >
                नियम व शर्तें
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
