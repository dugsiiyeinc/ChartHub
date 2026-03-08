import { Link } from 'react-router-dom'
import {
    HiLightBulb,
    HiChartBar,
    HiUserGroup,
    HiArrowRight,
    HiStar,
    HiTrendingUp,
    HiChatAlt2,
    HiSparkles,
    HiPlay
} from 'react-icons/hi'
import './Home.css'

const Home = () => {
    return (
        <div className="home-page">

            {/*  HERO SECTION  */}
            <section className="hero-section" id="hero">
                {/* Animated Background Orbs */}
                <div className="hero-bg-orb orb-1"></div>
                <div className="hero-bg-orb orb-2"></div>
                <div className="hero-bg-orb orb-3"></div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <HiSparkles /> Welcome to ChartHub
                    </div>

                    <h1 className="hero-title">
                        Share Your <span className="highlight">Trading Ideas</span> With The World
                    </h1>

                    <p className="hero-subtitle">
                        Connect with traders, share chart analysis, get feedback on your strategies,
                        and grow together in the most vibrant trading community.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/signup" className="hero-btn-primary" id="hero-get-started">
                            Get Started Free <HiArrowRight />
                        </Link>
                        <Link to="/idea" className="hero-btn-secondary" id="hero-browse-ideas">
                            <HiPlay /> Browse Ideas
                        </Link>
                    </div>
                </div>

                {/* Floating Idea Cards */}
                <div className="hero-cards">
                    <div className="floating-card card-1">
                        <div className="card-pair">
                            <span className="pair-name">EUR/USD</span>
                            <span className="pair-trend up"><HiTrendingUp /> +1.24%</span>
                        </div>
                        <p className="card-analysis">Bullish breakout above resistance at 1.0850. Targeting 1.0920 with strong momentum.</p>
                        <div className="card-footer">
                            <div className="card-author">
                                <div className="card-avatar av-1">C</div>
                                <span>Cabdi M.</span>
                            </div>
                            <div className="card-engagement">
                                <span><HiChatAlt2 /> 24</span>
                                <span><HiStar /> 58</span>
                            </div>
                        </div>
                    </div>

                    <div className="floating-card card-2">
                        <div className="card-pair">
                            <span className="pair-name">BTC/USD</span>
                            <span className="pair-trend up"><HiTrendingUp /> +3.87%</span>
                        </div>
                        <p className="card-analysis">Bitcoin holding key support at $67K. Expecting push to $72K if volume increases.</p>
                        <div className="card-footer">
                            <div className="card-author">
                                <div className="card-avatar av-2">S</div>
                                <span>Sahra C.</span>
                            </div>
                            <div className="card-engagement">
                                <span><HiChatAlt2 /> 42</span>
                                <span><HiStar /> 91</span>
                            </div>
                        </div>
                    </div>

                    <div className="floating-card card-3">
                        <div className="card-pair">
                            <span className="pair-name">GBP/JPY</span>
                            <span className="pair-trend down"><HiTrendingUp style={{ transform: 'rotate(180deg)' }} /> -0.65%</span>
                        </div>
                        <p className="card-analysis">Bearish divergence forming on the 4H chart. Short entry below 191.50 zone.</p>
                        <div className="card-footer">
                            <div className="card-author">
                                <div className="card-avatar av-3">M</div>
                                <span>Mahad W.</span>
                            </div>
                            <div className="card-engagement">
                                <span><HiChatAlt2 /> 18</span>
                                <span><HiStar /> 35</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  FEATURES SECTION  */}
            <section className="features-section" id="features">
                <div className="section-header">
                    <div className="section-label">✦ Why ChartHub</div>
                    <h2 className="section-heading">Everything You Need to Trade Smarter</h2>
                    <p className="section-desc">
                        A powerful platform built for traders who want to share, learn, and grow together.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card" id="feature-share">
                        <div className="feature-icon gold">
                            <HiLightBulb />
                        </div>
                        <h3 className="feature-title">Share Ideas</h3>
                        <p className="feature-desc">
                            Post your trading analysis with chart screenshots, set currency pairs,
                            and share your strategy with the community.
                        </p>
                    </div>

                    <div className="feature-card" id="feature-analytics">
                        <div className="feature-icon blue">
                            <HiChartBar />
                        </div>
                        <h3 className="feature-title">Track Performance</h3>
                        <p className="feature-desc">
                            Monitor your ideas, track engagement, and see how your trading
                            predictions perform over time.
                        </p>
                    </div>

                    <div className="feature-card" id="feature-community">
                        <div className="feature-icon purple">
                            <HiUserGroup />
                        </div>
                        <h3 className="feature-title">Join Community</h3>
                        <p className="feature-desc">
                            Connect with like-minded traders, comment on ideas, and build your
                            network in a supportive environment.
                        </p>
                    </div>
                </div>
            </section>

            {/*  HOW IT WORKS SECTION  */}
            <section className="how-section" id="how-it-works">
                <div className="section-header">
                    <div className="section-label">✦ How It Works</div>
                    <h2 className="section-heading">Start Trading Ideas in 3 Steps</h2>
                    <p className="section-desc">
                        Getting started is quick and simple. Join thousands of traders already sharing ideas.
                    </p>
                </div>

                <div className="how-grid">
                    <div className="how-step">
                        <div className="step-number step-1">1</div>
                        <HiUserGroup className="step-icon gold" />
                        <h3 className="step-title">Create Account</h3>
                        <p className="step-desc">
                            Sign up for free in seconds and set up your trader profile.
                        </p>
                    </div>

                    <div className="how-step">
                        <div className="step-number step-2">2</div>
                        <HiTrendingUp className="step-icon blue" />
                        <h3 className="step-title">Post Your Idea</h3>
                        <p className="step-desc">
                            Upload chart screenshots, select currency pair, and share your analysis.
                        </p>
                    </div>

                    <div className="how-step">
                        <div className="step-number step-3">3</div>
                        <HiChatAlt2 className="step-icon purple" />
                        <h3 className="step-title">Get Feedback</h3>
                        <p className="step-desc">
                            Receive comments and engage with the community on your ideas.
                        </p>
                    </div>
                </div>
            </section>

            {/*  STATS SECTION  */}
            <section className="stats-section" id="stats">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">2<span className="stat-accent">K+</span></span>
                        <span className="stat-text">Active Traders</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">5<span className="stat-accent">K+</span></span>
                        <span className="stat-text">Ideas Shared</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">15<span className="stat-accent">K+</span></span>
                        <span className="stat-text">Comments</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">50<span className="stat-accent">+</span></span>
                        <span className="stat-text">Currency Pairs</span>
                    </div>
                </div>
            </section>

            {/*  TESTIMONIALS SECTION  */}
            <section className="testimonials-section" id="testimonials">
                <div className="section-header">
                    <div className="section-label">✦ Testimonials</div>
                    <h2 className="section-heading">Loved by Traders Worldwide</h2>
                    <p className="section-desc">
                        Hear from our community members about their experience with ChartHub.
                    </p>
                </div>

                <div className="testimonials-grid">
                    <div className="testimonial-card" id="testimonial-1">
                        <div className="testimonial-stars">
                            <HiStar /><HiStar /><HiStar /><HiStar /><HiStar />
                        </div>
                        <p className="testimonial-text">
                            "ChartHub changed the way I approach trading. Getting feedback on my
                            analysis from other traders has been incredibly valuable."
                        </p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar avatar-1">C</div>
                            <div>
                                <div className="testimonial-name">Cabdi Maxamed</div>
                                <div className="testimonial-role">Forex Trader</div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card" id="testimonial-2">
                        <div className="testimonial-stars">
                            <HiStar /><HiStar /><HiStar /><HiStar /><HiStar />
                        </div>
                        <p className="testimonial-text">
                            "The community here is amazing. I've learned so much from other traders'
                            ideas and analysis. Highly recommend for any serious trader."
                        </p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar avatar-2">S</div>
                            <div>
                                <div className="testimonial-name">Sahra Cali</div>
                                <div className="testimonial-role">Crypto Analyst</div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card" id="testimonial-3">
                        <div className="testimonial-stars">
                            <HiStar /><HiStar /><HiStar /><HiStar /><HiStar />
                        </div>
                        <p className="testimonial-text">
                            "Clean interface, great community, and the ability to track my trading
                            ideas over time. ChartHub is exactly what I needed."
                        </p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar avatar-3">M</div>
                            <div>
                                <div className="testimonial-name">Mahad Warsame</div>
                                <div className="testimonial-role">Day Trader</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  CTA SECTION  */}
            <section className="cta-section" id="cta">
                <div className="cta-container">
                    <div className="cta-glow"></div>
                    <HiTrendingUp className="cta-icon" />
                    <h2 className="cta-title">Ready to Share Your Next Big Idea?</h2>
                    <p className="cta-desc">
                        Join thousands of traders who are already sharing their analysis
                        and growing their skills on ChartHub.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/signup" className="cta-btn-primary" id="cta-signup">
                            Start for Free <HiArrowRight />
                        </Link>
                        <Link to="/about" className="cta-btn-secondary" id="cta-learn-more">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home
