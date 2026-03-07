import { useState } from 'react'
import {
    HiLocationMarker,
    HiPhone,
    HiMail,
    HiArrowRight,
    HiSparkles,
    HiQuestionMarkCircle,
    HiPaperAirplane
} from 'react-icons/hi'
import { FaTwitter, FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', formData)
        alert('Message sent successfully! We will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="contact-page">

            {/* ===== HERO SECTION ===== */}
            <section className="contact-hero" id="contact-hero">
                <div className="contact-hero-orb orb-a"></div>
                <div className="contact-hero-orb orb-b"></div>

                <div className="contact-hero-content">
                    <div className="contact-badge">
                        <HiSparkles /> Get In Touch
                    </div>
                    <h1 className="contact-hero-title">
                        We'd Love to <span className="highlight">Hear From You</span>
                    </h1>
                    <p className="contact-hero-desc">
                        Have a question, suggestion, or just want to say hello?
                        Reach out to us and we'll get back to you as soon as possible.
                    </p>
                </div>
            </section>

            {/* ===== CONTACT INFO CARDS ===== */}
            <section className="contact-info-section" id="contact-info">
                <div className="contact-info-grid">
                    <div className="contact-info-card" id="info-location">
                        <div className="contact-info-icon gold">
                            <HiLocationMarker />
                        </div>
                        <h3 className="contact-info-title">Our Location</h3>
                        <p className="contact-info-text">
                            Ancona, Italy
                        </p>
                    </div>

                    <div className="contact-info-card" id="info-phone">
                        <div className="contact-info-icon blue">
                            <HiPhone />
                        </div>
                        <h3 className="contact-info-title">Phone Number</h3>
                        <p className="contact-info-text">
                            <a href="tel:+393662591124">+39 366 259 1124</a>
                        </p>
                    </div>

                    <div className="contact-info-card" id="info-email">
                        <div className="contact-info-icon purple">
                            <HiMail />
                        </div>
                        <h3 className="contact-info-title">Email Address</h3>
                        <p className="contact-info-text">
                            <a href="mailto:info@halsan.so">info@halsan.so</a>
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT FORM SECTION ===== */}
            <section className="contact-form-section" id="contact-form-section">
                <div className="contact-form-container">

                    {/* Left - Info */}
                    <div className="contact-form-info">
                        <div className="contact-form-label">✦ Send a Message</div>
                        <h2 className="contact-form-heading">Let's Start a Conversation</h2>
                        <p className="contact-form-desc">
                            Whether you have a question about features, need help with your account,
                            or want to share feedback about ChartHub — our team is ready to help.
                        </p>
                        <p className="contact-form-desc">
                            We typically respond within 24 hours during business days. For urgent
                            matters, please reach out via phone.
                        </p>

                        <div className="contact-social-title">Follow us on social media</div>
                        <div className="contact-socials">
                            <a href="#" className="contact-social-link" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" className="contact-social-link" aria-label="Discord"><FaDiscord /></a>
                            <a href="#" className="contact-social-link" aria-label="GitHub"><FaGithub /></a>
                            <a href="#" className="contact-social-link" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="contact-name">Full Name</label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    className="form-input"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="contact-email">Email</label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    className="form-input"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="contact-subject">Subject</label>
                            <input
                                type="text"
                                id="contact-subject"
                                name="subject"
                                className="form-input"
                                placeholder="What is this about?"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                className="form-textarea"
                                placeholder="Tell us more..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="form-submit" id="contact-submit-btn">
                            Send Message <HiPaperAirplane />
                        </button>
                    </form>

                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="contact-faq" id="contact-faq">
                <div className="contact-section-header">
                    <div className="contact-section-label">✦ FAQ</div>
                    <h2 className="contact-section-heading">Frequently Asked Questions</h2>
                    <p className="contact-section-desc">
                        Find answers to the most common questions about ChartHub.
                    </p>
                </div>

                <div className="faq-grid">
                    <div className="faq-item">
                        <div className="faq-question">
                            <HiQuestionMarkCircle />
                            <span>Is ChartHub free to use?</span>
                        </div>
                        <p className="faq-answer">
                            Yes! ChartHub is completely free to join and use. You can share unlimited
                            trading ideas, comment on others' analysis, and track your performance.
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <HiQuestionMarkCircle />
                            <span>What currency pairs are supported?</span>
                        </div>
                        <p className="faq-answer">
                            We support all major and minor forex pairs, popular cryptocurrencies,
                            and plan to add stocks and commodities soon.
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <HiQuestionMarkCircle />
                            <span>How do I share a trading idea?</span>
                        </div>
                        <p className="faq-answer">
                            Simply create an account, go to your dashboard, click "New Idea", upload
                            your chart screenshots, select a currency pair, and share your analysis.
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <HiQuestionMarkCircle />
                            <span>Can I edit or delete my ideas?</span>
                        </div>
                        <p className="faq-answer">
                            Yes, you have full control over your content. You can edit or delete
                            any idea you've posted from your dashboard at any time.
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <HiQuestionMarkCircle />
                            <span>How do I report inappropriate content?</span>
                        </div>
                        <p className="faq-answer">
                            You can report any content by clicking the report button on the idea
                            or contact us directly at info@halsan.so and we'll handle it promptly.
                        </p>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <HiQuestionMarkCircle />
                            <span>Is my data safe on ChartHub?</span>
                        </div>
                        <p className="faq-answer">
                            Absolutely. We use industry-standard encryption and security practices
                            to protect your data. Your privacy is our top priority.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Contact
