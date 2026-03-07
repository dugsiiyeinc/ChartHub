import { Link } from 'react-router-dom'
import { HiHome, HiLightBulb, HiInformationCircle, HiMail } from 'react-icons/hi'
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa'
import logo from '../assets/logo.png'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Top Section */}
                <div className="footer-top">

                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src={logo} alt="ChartHub Logo" />
                        </Link>
                        <p className="footer-desc">
                            Share your trading ideas, connect with traders, and grow your trading skills.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link"><FaTwitter /></a>
                            <a href="#" className="social-link"><FaDiscord /></a>
                            <a href="#" className="social-link"><FaGithub /></a>
                            <a href="#" className="social-link"><FaLinkedin /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links-group">
                        <h4>Quick Links</h4>
                        <Link to="/"><HiHome /> Home</Link>
                        <Link to="/idea"><HiLightBulb /> Ideas</Link>
                        <Link to="/about"><HiInformationCircle /> About</Link>
                        <Link to="/contact"><HiMail /> Contact</Link>
                    </div>

                    {/* Resources */}
                    <div className="footer-links-group">
                        <h4>Resources</h4>
                        <a href="#">Trading Guide</a>
                        <a href="#">Market Analysis</a>
                        <a href="#">Community</a>
                        <a href="#">FAQ</a>
                    </div>

                    {/* Legal */}
                    <div className="footer-links-group">
                        <h4>Legal</h4>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} ChartHub. All rights reserved.</p>
                </div>

            </div>
        </footer>
    )
}

export default Footer
