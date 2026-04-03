import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer-section' style={{ margin: '0 -16px', marginBottom: '-1px' }}>
            <div className='footer-grid max-w-6xl mx-auto'>
                {/* Brand Column */}
                <div className='footer-brand'>
                    <img src={assets.logo} className='w-36 opacity-90' alt="ZorryFash" />
                    <p>
                        ZorryFash is your destination for contemporary fashion that blends style with comfort. 
                        We curate premium clothing for the modern individual — from everyday essentials to standout 
                        pieces that define your personal style. Quality fabrics, thoughtful designs, and fashion that moves with you.
                    </p>
                    <div className="footer-social">
                        <a href="#" aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="5" />
                                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Twitter">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22 4s-1.5.7-2.8 1A4.5 4.5 0 0016 3.5a4.5 4.5 0 00-4.3 5.5A12.9 12.9 0 013 4.5s-4 9 5 13a13 13 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.1-1A9 9 0 0022 4z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="YouTube">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M22.54 6.42A2.78 2.78 0 0020.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.5A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.5C5.12 20 12 20 12 20s6.88 0 8.6-.5a2.78 2.78 0 001.94-1.92A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                                <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <p className='footer-heading'>Quick Links</p>
                    <ul className='footer-links'>
                        <li><Link to="/" onClick={() => window.scrollTo(0,0)}>Home</Link></li>
                        <li><Link to="/collection" onClick={() => window.scrollTo(0,0)}>Collection</Link></li>
                        <li><Link to="/about" onClick={() => window.scrollTo(0,0)}>About Us</Link></li>
                        <li><Link to="/contact" onClick={() => window.scrollTo(0,0)}>Contact</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <p className='footer-heading'>Help</p>
                    <ul className='footer-links flex flex-col gap-1'>
                        <li><Link to="/orders" onClick={() => window.scrollTo(0,0)}>Track Order</Link></li>
                        <li><Link to="/shipping" onClick={() => window.scrollTo(0,0)}>Shipping Info</Link></li>
                        <li><Link to="/returns" onClick={() => window.scrollTo(0,0)}>Returns & Exchanges</Link></li>
                        <li><Link to="/size-guide" onClick={() => window.scrollTo(0,0)}>Size Guide</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <p className='footer-heading'>Contact Us</p>
                    <ul className='footer-links'>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                            </svg>
                            +91 98765 43210
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            support@zorryfash.com
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            New Delhi, India
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='footer-bottom max-w-6xl mx-auto'>
                <p>© 2026 ZorryFash. All rights reserved.</p>
                <div className='footer-bottom-links'>
                    <Link to="/privacy-policy" onClick={() => window.scrollTo(0,0)}>Privacy Policy</Link>
                    <Link to="/terms" onClick={() => window.scrollTo(0,0)}>Terms of Service</Link>
                    <Link to="/refund" onClick={() => window.scrollTo(0,0)}>Refund Policy</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
